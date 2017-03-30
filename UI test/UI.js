		//set up canvas
		var c = document.getElementById("myCanvas");
		/*
		c = document.createElement('canvas');
		
		c.setAttribute("width","1280") ;
		c.setAttribute("height","720") ;
		*/
		var ctx = c.getContext("2d");
		var charcter; 
		
		var char1 = new Character ();
		char1.setUp ("Jacop", "char1.jpeg", 133, 2, 6, 5);
		
		
		var char2 = new Character ();
		char2.setUp ("Jacop", "char2.jpg", 289, 4, 7, 7);
		
		var charsArray = [];
		charsArray.push(char1);
		charsArray.push(char2);
		
		charcter = char1;
		console.log(charcter);
		
		var active = "messages"
		var UITabsListnerAdded = false;
		var messageListenerAdded = false;
		var isButtonClicked = false;
		var buttonTimer = 0;
		var clickedButton = "none"
		
		var maxQuickBarItems = 4;
		var chatBoxHighlighted = false;
		var isFullUIActive = false;
		var chatMessage = "";
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
		
		console.log(ctx.canvas.width)
		
		
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
				window.onkeydown = function (event) {
					if (chatBoxHighlighted)
					{
						if (event.key=="Enter")
						{
							chatBoxHighlighted = false;
							console.log("chat mesasage is: "+chatMessage);
							chatMessage = "";
						}
						else if (event.key=="Escape")
						{
							console.log("ESC was pressed")
							chatBoxHighlighted = false;
							chatMessage = "";
						}
						else if (event.key=="Backspace")
						{
							console.log("backspace was pressed")
							 
							chatMessage = chatMessage.substring(0, chatMessage.length - 1);
							 
						}
						else
						{	
							console.log(event.key+" was pressed");
							if ((47 < event.keyCode &&  event.keyCode < 91) || (event.keyCode == 32))
							{
								chatMessage+=event.key;
								//console.log(chatMessage);
							}
							
						}
					}
					else
					{
						switch (event.key) {
						case "i":
							if (!isFullUIActive)
							{
								isFullUIActive = true;
							}
								
							else
							{
								isFullUIActive = false;
							}
							break;
						case "Enter":
							chatBoxHighlighted = true;
							break;
						}						
					}
				}
		/*
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
			*/
		//just to be safe
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
			if(isFullUIActive)
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
		
		// it will have a portrait , hp bar and stat list 
		function drawPortraitUiElement(ctx)
		{
			
			
			//***outer box***
			//draw place
			var x = 0
			var y = 0
			//draw margins after all inside elments are drawn
			var marginx = 5
			var marginy = 3
			//draw size (will be changed to inculde each element)
			var width = marginx
			var height = marginy
			//draw colors
			var outerBoxColor = 'yellow'
			var color2 = 'orange'
			
			//***inner elements***
			//**section 1**
			//*portrait*
			//draw place
			var inPortx = 4
			var inPorty = 4
			var portx = inPortx+x+width-marginx
			var porty = inPorty+y
			//draw size
			var portWidth = 120
			var portHeight = 120
			borderSize = 2
			width = width+inPortx+portWidth+borderSize
			height = height+inPorty+portHeight+borderSize
			
			//**section 2**
			//*hp bar*
			//draw place
			var inHpx = 4
			var inHpy = 8
			hpx = inHpx+x+width-marginx
			hpy = inHpy+y
			//draw size
			hpWidth = 250
			hpHeight = 20
			width = width+inHpx+hpWidth
			//height (no need for now)
			hpBarOuterColor = "black"
			hpFillingColor = 'red'
			//hp text 
			var intTextx = 2
			var intTexty = 0
			var textx = intTextx+width-marginx
			var	texty = intTexty+hpy//it should be aligned with the hp bar
			var hpText = charcter.currentHp+"/"+charcter.maxHp+"hp"
			//hp font details
			var textSize = 16;
			var hpFont = textSize+"px Georgia";
			var hpTextColor = "green"
			var avrageTextWidth = ctx.measureText("@@@/@@@hp").width
			ctx.font = hpFont
			width = width+intTextx+avrageTextWidth
			texty = texty+textSize
			
			//*stats*
			var stats = ["Power","Speed","Sanity"];
			//draw place
			var inStatsx = 2;
			var inStatsy = 2; 
			var statsx = hpx;
			var statsy = inStatsy+y+hpy+hpHeight 
			//font
			var statsTextSize = 16;
			statsy = statsy+statsTextSize;
			var statsFont = statsTextSize +"px Georgia";
			var statsTextColor = hpTextColor
			//stats info
			ctx.font =statsFont
			var statsImagex = statsx+ctx.measureText("******:").width//avrage width
			var statsImagey = inStatsy+y+hpy+hpHeight+statsTextSize/2
			var rad = 5;
			//statsImagey+=rad;
			//***draw all elements***
			//draw outer box
			ctx.fillStyle = outerBoxColor
			ctx.fillRect(x,y,width,height)
			
			//draw portrait frame
			ctx.fillStyle = color2
			ctx.fillRect(portx-borderSize,porty-borderSize,portWidth+borderSize+borderSize,portHeight+borderSize+borderSize)
			
			//draw portrait
			if (charcter.portraitImageReady)
				ctx.drawImage(charcter.portraitImage, portx, porty, portWidth, portHeight)
			
			//draw outer hp bar
			ctx.fillStyle = hpBarOuterColor
			ctx.fillRect(hpx,hpy,hpWidth,hpHeight)
			//draw hp filling 
			ctx.fillStyle = hpFillingColor
			ctx.fillRect(hpx,hpy,(charcter.currentHp/charcter.maxHp)*hpWidth,hpHeight);
			//draw hp text
			ctx.font = hpFont;
			ctx.fillStyle = hpTextColor;
			ctx.fillText(hpText,textx,texty);
			
			//draw  stats text
			ctx.font = statsFont;
			fillStyle = statsTextColor;
			for (var i = 0 ; i < stats.length; i++)
				ctx.fillText(stats[i]+": ",statsx,statsy+statsTextSize*i+inStatsy*i)
			//draw stats image stats's ordered = [power,speed,sanity] a (note: a lot of hard coding)
			for (var i = 0 ; i < charcter.power; i++)
				drawStatImage(statsImagex+rad*i*2+(inStatsx*i) ,statsImagey)
			
			for (var i = 0 ; i < charcter.speed; i++)
				drawStatImage(statsImagex+rad*i*2+(inStatsx*i) ,statsImagey+statsTextSize+inStatsy)
			
			for (var i = 0 ; i < charcter.sanity; i++)
				drawStatImage(statsImagex+rad*i*2+(inStatsx*i) ,statsImagey+(statsTextSize+inStatsy)*2)
			
		}
		
		function drawChatUiElement(ctx)
		{
			//box
			var x = 0;
			var y = ctx.canvas.height;
			var width = 250;
			var height = 300;
			y = y-height;
			color = 'navy'
			//text
			var textx = 2;
			var texty = 4;
			var textSize = 16;
			var font = textSize+"px georgia";
			var textColor = "white" ;
			
			//chat input 
			var chatx = 0;
			var chaty = y+height;
			var chatWidth = width;
			var chatHeight = textSize;
			chaty-=chatHeight;
			var chatMargin = 2;
			chatHeight+=chatMargin;
			chatWidth -= chatMargin;
			chatHeight -= chatMargin;
			chaty-=chatMargin;
			chatx+=chatMargin;
			var chatColorActive = "black";
			var chatColorInactive = "grey";
			var chatBorderColor = "white";
			
			//draw everything
			ctx.fillStyle = color;
			ctx.fillRect(x,y,width,height);
			
			ctx.strokeStyle = chatBorderColor;
			ctx.lineWidth = chatMargin;
			ctx.rect(chatx,chaty,chatWidth+1,chatHeight);
			ctx.stroke();
			if (chatBoxHighlighted)
			{
				ctx.fillStyle = chatColorActive;
			}
			else
			{
				ctx.fillStyle = chatColorInactive;
			}
			
			ctx.fillRect(chatx,chaty,chatWidth,chatHeight);
			ctx.font = font;
			ctx.fillStyle = textColor;
			for (var i = 0 ; i < charcter.messagesLog.length ; i++)
			{
			ctx.fillText(charcter.messagesLog[charcter.messagesLog.length-i-1],textx,ctx.canvas.height- texty- textSize*i-chatHeight-chatMargin);
			if (i > 14)
				break;
			}
			ctx.fillText(chatMessage,chatx,chaty+textSize);
			
			
		}
		
		function drawItemsUiElement(ctx)
		{
			var x = ctx.canvas.width*0.3;
			var y = ctx.canvas.height;
			var width = 400;
			var height = 100;
			y -=height; 
			var numberOfShownItems = 4;
			var itemWidth = 80;
			var itemHeight = 80;
			var marginx = 15;
			var marginy = 10;
			var color1 = "purple";
			var color2 = "white";
			
			ctx.fillStyle = color1;
			ctx.fillRect(x,y,width,height);
			ctx.fillStyle = color2;
			
			for (i = 0 ; i < numberOfShownItems; i++)
			{
				ctx.fillRect(x+i*itemWidth+marginx*(i+1),y+marginy,itemWidth,itemHeight);
			}
			
			for (i = 0 ; i < numberOfShownItems && i< charcter.inventory.length; i++)
			{
				var img = itemsInGame[charcter.quickBarItems[i]].image;
				ctx.drawImage(img,x+i*itemWidth+marginx*(i+1),y+marginy,itemWidth,itemHeight);
			}
			
		}
		
		function drawFullMessageUiElement(ctx,x,y,width,height,color)
		{
			
			
			
			
			//draw everything
			ctx.fillStyle = color;
			ctx.fillRect(x,y,width,height);
			
			
			//draw up and down arrows
			var boxWidth = 20;
			var boxHeight = 20;
			var heightMargin = 5;
			var upx = x+width-boxWidth;
			var upy = y+heightMargin;
			var downx = x+width-boxWidth;
			var downy = y+height-boxHeight-heightMargin;
			
			var boxColorUp = "green";
			var boxColorDown = "green";
			var scrollBarColor = "blue"
			var arrowColor = "yellow";
			//text 
			var textSize = 16;
			var font = textSize+"px georgia";
			var textColor = "white";
			
			var MaxNumberOfMessages = 25;
			ctx.fillStyle = scrollBarColor;
			ctx.fillRect(upx,upy,boxWidth,downy-upy);
			
			
			
			
			//drawing triangles
			ctx.fillStyle = "yellow";
			//up
			//ctx.beginPath();
			
			/*
			
			ctx.moveTo(xposArrowBox+widthArrowBox/2,yposArrowBox+7);
			ctx.lineTo(xposArrowBox+widthArrowBox,yposArrowBox+2+heightArrowBox);
			ctx.lineTo(xposArrowBox,yposArrowBox+2+heightArrowBox);
			ctx.lineTo(xposArrowBox+widthArrowBox/2,yposArrowBox+7);
			
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
			*/
			
			//handle mouse clicks when menus UI is active
			
			function t(){
				 
				//event.preventDefault();
				if (active == "messages")
					{
						//bool is where the cursor is NOT on the box
						var bool = currentX<upx||upx+boxWidth<currentX||currentY<upy||upy+boxHeight<currentY;
						if (!bool)
						{
							console.log("it is working on arrow up");
							isButtonClicked = true;
							clickedButton = "up"
							
							if (charcter.messagesLog.length>MaxNumberOfMessages) 
							{
								if (charcter.chatPointer<charcter.messagesLog.length-MaxNumberOfMessages) // you can only move if the items being viewed will not go byoned the last postion  
								{
									//boxColorUp = "#238435";
									
									charcter.chatPointer++;
									console.log("char pointer: "+charcter.chatPointer);
								}
							}
						}
						//bool is where the cursor is NOT on the box
						bool = currentX<downx||downx+boxWidth<currentX||currentY<downy||downy+boxHeight<currentY;
						if (!bool)
						{
							console.log("it is working on arrow down");
							isButtonClicked = true;
							clickedButton = "down"
							if (charcter.chatPointer>0)
							{
								//boxColorDown = "#238435";
								charcter.chatPointer--;
							}
						}
					}
				
			}
			
			if (!messageListenerAdded)
			{
				c.addEventListener('mousedown', t,false);
				messageListenerAdded = true;
			}
			
			
			// if a box is hovered change color
			var bool = currentX<upx||upx+boxWidth<currentX||currentY<upy||upy+boxHeight<currentY;
			if (!bool)
			{
				boxColorUp = "#42f462";
			}
			bool = currentX<downx||downx+boxWidth<currentX||currentY<downy||downy+boxHeight<currentY;
			if (!bool)
			{
				boxColorDown = "#42f462";
			}
			
			
			if (isButtonClicked)
			{
				
				switch (clickedButton)
				{
					case "up":
					boxColorUp = "#1a2d12";
					break;
					
					case "down":
					boxColorDown = "#1a2d12";
					break;
					
				}
				
				buttonTimer++;
				if (buttonTimer>10)
				{
					buttonTimer=0;
					isButtonClicked=false;
				}
			}
			//draw up down boxes
			ctx.fillStyle = boxColorUp;
			ctx.fillRect(upx,upy,boxWidth,boxHeight);
			ctx.fillStyle = boxColorDown;
			ctx.fillRect(downx,downy,boxWidth,boxHeight);
			
			//charcter.chatPointer
			ctx.font = font;
			ctx.fillStyle = textColor;
			for (var i = 0 ; i < charcter.messagesLog.length ; i++)
			{
				ctx.fillText(charcter.messagesLog[charcter.messagesLog.length-i-1-charcter.chatPointer],x,y+height-(textSize)*(i+1));
				if (i > MaxNumberOfMessages-2)
				{
					//console.log("is is:"+i)
					break;
				}
					
			}
			var temp = charcter.messagesLog.length-MaxNumberOfMessages;
			ctx.fillStyle = arrowColor;//ctx.fillRect(upx,upy,boxWidth,downy-upy);
			if (charcter.messagesLog.length>MaxNumberOfMessages)
				ctx.fillRect(upx,upy+boxHeight+((temp-charcter.chatPointer)/temp)*(downy-upy-boxHeight-boxHeight),boxWidth,boxHeight)
		}
		
		function drawFullItemsUiElement(ctx,x,y,width,height,color)
		{
			//main item
			//draw place
			var mainImgx = x;
			var mainImgy = y;
			//image size
			var mainImgWidth = 150;
			var mainImgHeight = 150;
			
			//rest of items 
			//draw place 
			var imgx = x;
			var imgy = mainImgy+mainImgWidth;
			//image size
			var imgWidth = 80;
			var imgHeight = 80;
			
			var marginx = 5
			var marginy = 5;
			
			var maxViewedItems = 5;
			//draw everything
			ctx.fillStyle = color;
			ctx.fillRect(x,y,width,height);
			//text
			var textSize = 16;
			var font = textSize+"px georgia";
			var textColor = "white" ;
			
			
			var j = -1;
			var i = 0;
			for (ii = 0 ; ii < charcter.inventory.length;ii++)
			{
				if (i%maxViewedItems==0)
				{	i = 0;
					j++;
				}
					
				var img = itemsInGame[charcter.inventory[ii]].image;
				ctx.drawImage(img,imgx+imgWidth*(i)+marginx*(i),imgy+imgHeight*(j)+marginy*(j),imgWidth,imgHeight);
				
				i++;
			}
			if (0< charcter.inventory.length)
			{
				var img = itemsInGame[charcter.inventory[0]].image;
				ctx.drawImage(img,mainImgx,mainImgy,mainImgWidth,mainImgHeight);
			}
				
		}
		
		function drawPasuedMenuUi (ctx)
		{
			//draw place
			var x = ctx.canvas.width*0.45
			var y = 45
			//draw size 
			var width = 500;
			var height = 450;
			var colors = ["crimson","orange"]
			
			
			//tabs
			//draw place 
			var tabx = x
			var taby = y
			//draw size
			var tabWidth = 80
			var tabHeight = 30
			var taby=taby-tabHeight
			var tabsMargin = 10;
			var textMargin = 5;
			var textSize = 16;
			var font = textSize+"px georgia";
			var textColor = "white" ;
			function t(){
				//event.preventDefault();
				var bool = currentX<tabx||tabx+tabWidth<currentX||currentY<taby||taby+tabHeight<currentY;
				
				if (!bool)
				{
					active = "messages"
				}
			
				bool = currentX<tabx+tabWidth+tabsMargin||tabx+tabWidth+tabsMargin+tabWidth<currentX||currentY<taby||taby+tabHeight<currentY;
				
				if (!bool)
				{
					active = "items"
				}
				
			}
			if (!UITabsListnerAdded)
			{
				c.addEventListener('click', t,false);
				UITabsListnerAdded = true;
			}

			var bool = currentX<tabx||tabx+tabWidth<currentX||currentY<taby||taby+tabHeight<currentY;
			if (!bool&&active!="messages")
			{
				colors[0] = "#d35052"
			}
			bool = currentX<tabx+tabWidth+tabsMargin||tabx+tabWidth+tabsMargin+tabWidth<currentX||currentY<taby||taby+tabHeight<currentY;
			if (!bool&&active!="items")
			{
				colors[1] = "#d29850"
			}
			//tabs
			var tabs = ["messages","items"]
			switch (active)
			{
				case "messages":
				drawFullMessageUiElement(ctx,x,y,width,height,colors[0])
				
				break;
				
				case "items":
				drawFullItemsUiElement(ctx,x,y,width,height,colors[1])
				
				break;
			}
			
			
			for (var i = 0; i < tabs.length;i++)
			{
				ctx.fillStyle = colors[i];
				ctx.fillRect (tabx+tabWidth*i+tabsMargin*i,taby,tabWidth,tabHeight)
				ctx.font = font;
				ctx.fillStyle = textColor;
				ctx.fillText(tabs[i],tabx+textMargin+tabWidth*i+tabsMargin*i,taby+textSize+textMargin)
			}
			
		}
		function drawUiTwo()
		{
			ctx.clearRect(0, 0, c.width, c.height);
			
			if (isBgLoaded)
				ctx.drawImage(bgImg, 0, 0 , 1280 , 720);
			drawPortraitUiElement(ctx);
			drawChatUiElement(ctx);
			drawItemsUiElement(ctx);
			if (isFullUIActive)
			{
				drawPasuedMenuUi(ctx);
			}
			
		}
		
		//setInterval(drawUI, 1000/60);
		setInterval(drawUiTwo, 1000/60);
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
		if (charcter.quickBarItems.length<maxQuickBarItems)
			charcter.quickBarItems.push(num)
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
		