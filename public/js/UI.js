		//set up canvas
		var c = document.getElementById("myCanvas");
		c = document.createElement('canvas');
		
		c.setAttribute("width","1280") ;
		c.setAttribute("height","720") ;
		var ctx = c.getContext("2d");
		var charcter; 
		
		var char1 = new Character ();
		char1.setUp ("Jacop", "char1.jpeg", 133, 2, 6, 5);
		
		
		//var char2 = new Character ();
		//char2.setUp ("Jacop", "char2.jpg", 289, 4, 7, 7);
		
		var charsArray = [];
		charsArray.push(char1);
		//charsArray.push(char2);
		
		charcter = char1;
		console.log(charcter);
		
		// load bg image
		var bgImg = new Image();
		bgImg.src = "1.png";
		var isBgLoaded = false;
		bgImg.onload = function() {
		var backBuffer = document.createElement('canvas');
		var backCtx = backBuffer.getContext('2d');
		backBuffer.width = 1280;
		backBuffer.height = 720;
        backCtx.drawImage(bgImg, 0, 0 , 1280 , 720);
		backCtx.drawImage(c , 0 ,0)
		ctx.drawImage(backBuffer,0,0);
		//isBgLoaded = true;
		};
		
		
		
		
		//items
		var itemsInGame = [];
		var itemsInventory = []
		
		var item1 = { name: "potion" , image: new Image(), isImageReady: false };
		item1.image.src = "item1.png";
		item1.image.onload = function() {
		item1.isImageReady = true;
		//drawUI();
		};
		itemsInGame.push(item1);
		
		var item2 = { name: "dagger" , image: new Image(), isImageReady: false };
		item2.image.src = "item2.png";
		item2.image.onload = function() {
		item2.isImageReady = true;
		//drawUI();
		};
		itemsInGame.push(item2);
		
		var item3 = { name: "spear" , image: new Image(), isImageReady: false };
		item3.image.src = "item3.png";
		item3.image.onload = function() {
		item3.isImageReady = true;
		//drawUI();
		};
		itemsInGame.push(item3);
		
		var item4 = { name: "armor" , image: new Image(), isImageReady: false };
		item4.image.src = "item4.png";
		item4.image.onload = function() {
		item4.isImageReady = true;
		//drawUI();
		};
		itemsInGame.push(item4);

		
		//items in the items bar
		//var itemsBarStart = 0; // will draw items starting from this one 
		
		// UI colors 
		var statsColors = "green"; // inculdes stats text, hp bar and portrait borders
		var statsBackgroundColor = 'pink'; // inculdes all statsColors elements 
		var itemsBarColor = 0;
		var messagesLogColor = 0;
		
		//sizes and postions
		//charcter portrait placeholder
		var xposPortrait = 2;
		var yposPortrait = 2;
		var widthPortrait = 100;
		var heightPortrait = 100;
	
		xMargin = 6;
		//hp container
		var xposHpContainer = xposPortrait + widthPortrait + xMargin;
		var yposHpContainer = yposPortrait+2;
		var widthHpContainer = 200;
		var heightHpContainer = 20;
		
		//full message log UI 
		var xposFullMessageLog = 600;
		var yposFullMessageLog = 20;
		var widthFullMessageLog = 500;
		var heightFullMessageLog = 500;
		var currentX;
		var currentY;
		
		//arrow box variables
		var widthArrowBox = 25;
		var heightArrowBox = 25;
		var xposArrowBox = xposFullMessageLog+widthFullMessageLog-5-widthArrowBox;
		var yposArrowBox = yposFullMessageLog;
		
		//track mouse movement
		c.onmousemove = function(event) {
				event.preventDefault();
				currentX = event.offsetX;
				currentY = event.offsetY;
				 
				}
		//handle mouse clicks when menus UI is active
		c.onclick = function(event) {
			event.preventDefault();
			if (true)
				{
					//bool is where the cursor is NOT on the box
					var bool = currentX<xposArrowBox||xposArrowBox+widthArrowBox<currentX||currentY<yposArrowBox+5||yposArrowBox+heightArrowBox+5<currentY;
					if (!bool)
					{
						console.log("it is working on arrow up");
						
						if (charcter.messagesLog.length>23) 
						{
							if (charcter.chatPointer<charcter.messagesLog.length-23) // you can only move if the items being viewed will not go byoned the last postion  
							{
								
								charcter.chatPointer++;
								console.log("char pointer: "+charcter.chatPointer);
							}
						}
					}
					//bool is where the cursor is NOT on the box
					bool = currentX<xposArrowBox||xposArrowBox+widthArrowBox<currentX||currentY<yposArrowBox+
														heightFullMessageLog-heightArrowBox-5||yposArrowBox+heightFullMessageLog-5<currentY;
					if (!bool)
					{
						console.log("it is working on arrow down");
						if (charcter.chatPointer>0)
						{
							charcter.chatPointer--;
						}
					}
				}
			
			}
			
		//full item list UI 
		function drawUI ()
		{
			//clear than redraw all UI elements
			ctx.clearRect(0, 0, c.width, c.height);
			//draw bg image
			if (isBgLoaded)
				ctx.drawImage(bgImg, 0, 0 , 1280 , 720);
			
			
			//draw background for portrait, stats and hp bar
			//ctx.fillStyle = "rgba(59, 136, 147, 0.5)"; //bluesih shade
			ctx.fillStyle=statsBackgroundColor;
			ctx.fillRect(0,0,widthPortrait+widthHpContainer+120,heightPortrait+4);
			
			//draw portrait placeholder 
			ctx.fillStyle="black";
			ctx.fillRect(xposPortrait,yposPortrait,widthPortrait,heightPortrait);
			ctx.stroke();
			
			//draw portrait image
			if (charcter.portraitImageReady)
				ctx.drawImage(charcter.portraitImage, xposPortrait+2, yposPortrait+2 , widthPortrait-4 , heightPortrait-4);
				
			//hp container draw
			ctx.fillStyle="black";
			ctx.fillRect(xposHpContainer,yposHpContainer,widthHpContainer,heightHpContainer);
			
			//hp bar
			hpBarborder = 3;
			xposHpBar = xposHpContainer +hpBarborder;
			yposHpBar = yposHpContainer +hpBarborder;
			widthHpBar = widthHpContainer -(2*hpBarborder);
			heightHpBar = heightHpContainer -(2*hpBarborder);
			ctx.fillStyle="grey";
			ctx.fillRect(xposHpBar,yposHpBar,widthHpBar,heightHpBar);
			ctx.fillStyle="#FF0000";
			ctx.fillRect(xposHpBar,yposHpBar,(charcter.currentHp/charcter.maxHp)*widthHpBar,heightHpBar);
			
			//hp text
			ctx.font="20px Georgia";
			ctx.fillStyle=statsColors;
			ctx.fillText(charcter.currentHp+"/"+charcter.maxHp+"hp",xposHpContainer+widthHpContainer+xMargin,yposHpContainer+15);
			
			//charcter stats image		
			function drawStatImage(x , y )
			{
				r = 5;
				ctx.beginPath();
				ctx.arc(x+r,y+r,r,0,2*Math.PI);
				ctx.fillStyle="blue";
				ctx.fill();
				ctx.closePath()
				
				ctx.beginPath();
				ctx.arc(x+r,y+r,r/3,0,2*Math.PI);
				ctx.fillStyle="yellow";
				ctx.fill();
				ctx.closePath()
			}
			
			//draw chracter stats
			var yMargin = 20;
			var txt = "";
			var yposStat = yposHpContainer;
			
			//sanity
			yposStat = yposStat+yMargin;
			ctx.font="20px Georgia";
			txt = "Sanity: ";
			ctx.fillStyle=statsColors;
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < charcter.sanity; i++)
			{	
				r = 5;
				drawStatImage(xposHpContainer +ctx.measureText(txt).width+ i*xMargin+(i*2*r),yposStat+10);
			}
			
			//power
			yposStat = yposStat+yMargin;
			ctx.font="20px Georgia";
			txt = "Power: ";
			ctx.fillStyle=statsColors;
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < charcter.power; i++)
			{	
				r = 5;
				drawStatImage(xposHpContainer +ctx.measureText(txt).width+ i*xMargin+(i*2*r),yposStat+10);
			}
			
			//speed
			yposStat = yposStat+yMargin;
			ctx.font="20px Georgia";
			txt = "Speed: ";
			ctx.fillStyle=statsColors;
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < charcter.speed; i++)
			{	
				r = 5;
				drawStatImage(xposHpContainer +ctx.measureText(txt).width+ i*xMargin+(i*2*r),yposStat+10);
			}
			
			
			//end of charcter info UI***************************************************************
			
			//chat UI

			var widthChat = 400;
			var heightChat = 300;
			var yposChat  = 720-heightChat;
			ctx.fillStyle = "rgba(83, 128, 135, 0.7)";//draker blue
			//ctx.fillStyle = "rgba(59, 136, 147, 0.5)"; //bluesih shade
			ctx.fillRect(0,yposChat,widthChat,heightChat);
			
			//messages
			ctx.fillStyle = "white";
			ctx.font = "16px Georgia";
			for (var i = 0 ; i < charcter.messagesLog.length ; i++)
			{
			ctx.fillText(charcter.messagesLog[charcter.messagesLog.length-i-1],2,720-5 - 18*i);
			if (i > 14)
				break;
			}
			
			//items UI
			//items bar 
			var widthItems = 400;
			var heightItems = 100;
			var xposItem = (1280-widthItems)/2;
			var yposItems = 720-heightItems-40;
			
			ctx.fillStyle = "purple";//draker blue
			ctx.fillRect(xposItem,yposItems,widthItems,heightItems);
			
			//items 
			for (var i = 0 ;i < 4 ;i++)
			{
				var w = (widthItems/4)-12;
				var h = heightItems-20;
				ctx.fillStyle = "white";
				ctx.fillRect ((i*w)+((i+1)*10)+xposItem,10+yposItems,w,h);
			}
			
				var j = charcter.itemsPointer;
				
				for (var i = 0 ;i < 4 ;i++)
				{	if (j>= charcter.inventory.length)
						break;
					if (j == charcter.inventory.length)
						console.log("it went too much");
					var w = (widthItems/4)-12;
					var h = heightItems-20;
					var img = itemsInGame[charcter.inventory[j]].image;
					//console.log("img is: "+img);
					ctx.drawImage(img, (i*w)+((i+1)*10)+xposItem,10+yposItems,w,h);
					
					j++;
				}
			
			
			
			//items label
			var widthItemsLabel = 100;
			var heightItemsLabel = 30;
			var xposItemLabel = ((xposItem+xposItem+widthItems-widthItemsLabel)/2);
			var yposItemLabel = yposItems-heightItemsLabel;
			ctx.fillStyle = "purple";
			ctx.fillRect(xposItemLabel,yposItemLabel,widthItemsLabel,heightItemsLabel);
			
			ctx.fillStyle = "white";
			ctx.font = "16px Georgia";
			ctx.fillText("Your Items",xposItemLabel+9, yposItemLabel+18);
			
			//number of items label
			var widthItemsNumber = 150;
			var heightItemsNumber = 30;
			var xposItemNumber = ((xposItem+xposItem+widthItems-widthItemsNumber)/2);
			var yposItemNumber = yposItems+heightItems;
			ctx.fillStyle = "purple";
			ctx.fillRect(xposItemNumber,yposItemNumber,widthItemsNumber,heightItemsNumber);
			
			ctx.fillStyle = "white";
			ctx.font = "16px Georgia";
			ctx.fillText("You have "+charcter.inventory.length+" items",xposItemNumber+9, yposItemNumber+18);
			
				
			
			//the full messages log UI
			if(true)
			{
				
				
				//console.log(currentX);
				
				//background box
				ctx.fillStyle = "crimson";
				ctx.fillRect(xposFullMessageLog,yposFullMessageLog,widthFullMessageLog,heightFullMessageLog);
				
				
				//draw up and down arrows
				ctx.fillStyle = "green";
				ctx.fillRect(xposArrowBox,yposArrowBox+5,widthArrowBox,heightArrowBox);
				ctx.fillRect(xposArrowBox,yposArrowBox+heightFullMessageLog-5-heightArrowBox,widthArrowBox,heightArrowBox);
				
				 
				ctx.beginPath();
				ctx.moveTo(xposArrowBox+widthArrowBox/2,yposArrowBox+7);
				ctx.lineTo(xposArrowBox+widthArrowBox,yposArrowBox+2+heightArrowBox);
				ctx.lineTo(xposArrowBox,yposArrowBox+2+heightArrowBox);
				ctx.lineTo(xposArrowBox+widthArrowBox/2,yposArrowBox+7);
				ctx.fillStyle = "yellow";
				ctx.fill();
				ctx.closePath();
				
				
				
				 
				ctx.beginPath();
				ctx.moveTo(xposArrowBox+widthArrowBox/2, yposArrowBox+heightFullMessageLog-7);
				ctx.lineTo(xposArrowBox+widthArrowBox, yposArrowBox+heightFullMessageLog-heightArrowBox-2);
				ctx.lineTo(xposArrowBox,yposArrowBox+heightFullMessageLog-heightArrowBox-2);
				ctx.lineTo(xposArrowBox+widthArrowBox/2, yposArrowBox+heightFullMessageLog-7);
				ctx.fillStyle = "yellow";
				ctx.fill();
				ctx.closePath();
				
				//messages
				ctx.fillStyle = "white";
				ctx.font = "16px Georgia";
				ctx.fillText("There are "+charcter.messagesLog.length+" messages",xposArrowBox-170,yposFullMessageLog+5+heightArrowBox);
				
				
				var jj = charcter.chatPointer;
				if (charcter.messagesLog.length<24)
				{
						for (var i = 0 ; i < charcter.messagesLog.length ; i++)
					{
					ctx.fillText(charcter.messagesLog[charcter.messagesLog.length-i-1],xposFullMessageLog+2,yposFullMessageLog+widthFullMessageLog-5 - 18*i);

					}
				}
				else 
				{
					for (var i = 0 ; i < 23 ; i++)
					{
						ctx.fillText(charcter.messagesLog[charcter.messagesLog.length-jj-1],xposFullMessageLog+2,yposFullMessageLog+widthFullMessageLog-5 - 18*i);
						jj++;
					}
				}
			
				
			}
			
			//the full item list UI  

		}
		
		setInterval(drawUI, 1000/60);
		
		function getCanvasElement(){
			
			return c;
		}
		
		// Debugging functions 
		function changeStat(stat, num)
		{
			switch(stat){
				case 'hp':
				charcter.changeHp(num);//+=num;  
				break;
				
				case 'sanity':
				charcter.changeSanity(num)
				break;
				
				case 'power':
				charcter.changePower(num)
				break;
				
				case 'speed':
				charcter.changeSpeed(num)
				break;
			
			}
			if (num > 0)
					charcter.messagesLog.push("You gained "+num+" "+stat+"!");
				else
					charcter.messagesLog.push("You lost "+(-1)*num+" "+stat+"!");
			 
		}
		
		function gainRandomItem()
		{
		var num = (Math.floor(Math.random()*100))%itemsInGame.length;
		//charcter.inventory.push(num)
		charcter.addItem(num);
		charcter.messagesLog.push("You gained a "+itemsInGame[num].name+"!");
		 
		}
		
		function loseRandomItem()
		{
		var num = (Math.floor(Math.random()*100))%charcter.inventory.length;
		var num2 = charcter.inventory[num];
		
		charcter.removeItem(num);
		//charcter.inventory.splice(num,1);
		charcter.messagesLog.push("You have lost "+itemsInGame[num2].name+"!");
		
		 
		}
		
		function scrollItemsRight ()
		{
			charcter.scrollItemsRight();
		}
		
		function scrollItemsLeft ()
		{	 
			charcter.scrollItemsLeft();
		}
		
		function swapCharacter (x)
		{	
		
		charcter = charsArray[x];
		}
		