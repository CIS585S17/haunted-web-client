		//set up canvas
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		
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
		isBgLoaded = true;
		};
		
		//charcter info 
		maxHP = 120;
		currentHp = 80;
		sanity = 4;
		power = 2;
		speed = 7;
		
		//items
		var itemsInGame = [];
		var itemsInventory = []
		
		var item1 = { name: "potion" , image: new Image(), isImageReady: false };
		item1.image.src = "item1.png";
		item1.image.onload = function() {
		item1.isImageReady = true;
		drawUI();
		};
		itemsInGame.push(item1);
		
		var item2 = { name: "dagger" , image: new Image(), isImageReady: false };
		item2.image.src = "item2.png";
		item2.image.onload = function() {
		item2.isImageReady = true;
		drawUI();
		};
		itemsInGame.push(item2);
		
		var item3 = { name: "spear" , image: new Image(), isImageReady: false };
		item3.image.src = "item3.png";
		item3.image.onload = function() {
		item3.isImageReady = true;
		drawUI();
		};
		itemsInGame.push(item3);
		
		var item4 = { name: "armor" , image: new Image(), isImageReady: false };
		item4.image.src = "item4.png";
		item4.image.onload = function() {
		item4.isImageReady = true;
		drawUI();
		};
		itemsInGame.push(item4);
		
		//itemsInventory.push(0);
		
		//items in the items bar
		var itemsBarStart = 0; // will draw items starting from this one 
		
		//charcter portrait placeholder
		var xposPortrait = 2;
		var yposPortrait = 2;
		var widthPortrait = 100;
		var heightPortrait = 100;
		
		// load portrait image
		var portraitImg = new Image();
		portraitImg.src = "2.jpeg";
		var isPortraitLoaded = false;
		portraitImg.onload = function() {
		isPortraitLoaded = true;
		drawUI();
		};
		
		xMargin = 6;
		//hp container
		var xposHpContainer = xposPortrait + widthPortrait + xMargin;
		var yposHpContainer = yposPortrait+2;
		var widthHpContainer = 200;
		var heightHpContainer = 20;
		
		//chat info 
		var chatLog = [];
		console.log("chatLog Length:"+chatLog.length);
		console.log("chatLog Length:"+chatLog.length);
		function drawUI ()
		{
			//clear than redraw all UI elements
			ctx.clearRect(0, 0, c.width, c.height);
			//draw bg image
			if (isBgLoaded)
				ctx.drawImage(bgImg, 0, 0 , 1280 , 720);
				
			//draw portrait placeholder 
			ctx.fillStyle="black";
			ctx.fillRect(xposPortrait,yposPortrait,widthPortrait,heightPortrait);
			ctx.stroke();
			
			//draw portrait image
			if (isPortraitLoaded)
				ctx.drawImage(portraitImg, xposPortrait+2, yposPortrait+2 , widthPortrait-4 , heightPortrait-4);
				
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
			ctx.fillRect(xposHpBar,yposHpBar,(currentHp/maxHP)*widthHpBar,heightHpBar);
			
			//hp text
			ctx.font="20px Georgia";
			ctx.fillStyle="black";
			ctx.fillText(currentHp+"/"+maxHP+"hp",xposHpContainer+widthHpContainer+xMargin,yposHpContainer+15);
			
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
			ctx.fillStyle="black";
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < sanity; i++)
			{	
				r = 5;
				drawStatImage(xposHpContainer +ctx.measureText(txt).width+ i*xMargin+(i*2*r),yposStat+10);
			}
			
			//power
			yposStat = yposStat+yMargin;
			ctx.font="20px Georgia";
			txt = "Power: ";
			ctx.fillStyle="black";
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < power; i++)
			{	
				r = 5;
				drawStatImage(xposHpContainer +ctx.measureText(txt).width+ i*xMargin+(i*2*r),yposStat+10);
			}
			
			//speed
			yposStat = yposStat+yMargin;
			ctx.font="20px Georgia";
			txt = "Speed: ";
			ctx.fillStyle="black";
			ctx.fillText(txt,xposHpContainer,yposStat+yMargin);
			for (var i = 0 ; i < speed; i++)
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
			
			ctx.fillStyle = "white";
			ctx.font = "16px Georgia";
			for (var i = 0 ; i < chatLog.length ; i++)
			{
			ctx.fillText(chatLog[chatLog.length-i-1],2,720-5 - 18*i);
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
			if (itemsInventory.length < 4)
			{
				for (var i = 0 ;i < itemsInventory.length ;i++)
				{	
					if (i == 4)
						break;
					
					var w = (widthItems/4)-12;
					var h = heightItems-20;
					var img = itemsInGame[itemsInventory[i]].image;
					ctx.drawImage(img, (i*w)+((i+1)*10)+xposItem,10+yposItems,w,h);
				}
			}
			else
			{
				var j = itemsBarStart;
				console.log("j is: "+j);
				for (var i = 0 ;i < 4 ;i++)
				{	
					if (j == itemsInventory.length)
						console.log("it went too much");
					var w = (widthItems/4)-12;
					var h = heightItems-20;
					var img = itemsInGame[itemsInventory[j]].image;
					ctx.drawImage(img, (i*w)+((i+1)*10)+xposItem,10+yposItems,w,h);
					
					j++;
				}
			
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
			ctx.fillText("You have "+itemsInventory.length+" items",xposItemNumber+9, yposItemNumber+18);

		}
		
		drawUI();
		
		function changeStat(stat, num)
		{
			switch(stat){
				case 'hp':
				currentHp+=num; console.log(currentHp);
				
				break;
				
				case 'sanity':
				sanity+=num;
				break;
				
				case 'power':
				power+=num;
				break;
				
				case 'speed':
				speed+=num;console.log("current speed:"+speed);
				break;
			
			}
			if (num > 0)
					chatLog.push("You gained "+num+" "+stat+"!");
				else
					chatLog.push("You lost "+(-1)*num+" "+stat+"!");
			drawUI();
		}
		
		function gainRandomItem()
		{
		var num = (Math.floor(Math.random()*100))%itemsInGame.length;
		itemsInventory.push(num)
		chatLog.push("You gained a "+itemsInGame[num].name+"!");
		drawUI();
		}
		
		function loseRandomItem()
		{
		var num = (Math.floor(Math.random()*100))%itemsInventory.length;
		var num2 = itemsInventory[num];
		itemsInventory.splice(num,1);
		chatLog.push("You have lost "+itemsInGame[num2].name+"!");
		
		console.log(itemsBarStart);
		if (itemsInventory.length>4)
			itemsBarStart--;
		else 
			itemsBarStart = 0;
		
		if (itemsBarStart<0)
			itemsBarStart = 0;
		
		drawUI();
		}
		
		function scrollItemsRight ()
		{
			if (itemsInventory.length>4)
			{
				if (itemsBarStart< itemsInventory.length-4)
					itemsBarStart++;
				console.log(itemsBarStart);
				drawUI();
			}
		}
		
		function scrollItemsLeft ()
		{	if (itemsInventory.length>3)
			{
				if (itemsBarStart> 0)
					itemsBarStart--;
					
				drawUI();
			}
		}
		