function Character ()
{
	this.name;
	this.portraitImage;
	this.currentHp;
	this.maxHp;
	this.power;
	this.speed;
	this.sanity;
	this.inventory;
	this.messagestLog;
}

Character.prototype.setUp = function  (name, portraitImage, maxHp, power, speed, sanity)
{
	this.name = name;
	this.portraitImage = portraitImage;
	this.currentHp = maxHp;
	this.maxHp = maxHp;
	this.power = power;
	this.speed = speed;
	this.sanity = sanity;
	this.inventory = [];
	this.messagestLog = [];
	
}

Character.prototype.changeHp = function(amount)
{
	this.currentHp+=amount;
	
}

Character.prototype.changePower = function (amount)
{
	this.power+=amount;
	
}

Character.prototype.changeSpeed = function(amount)
{
	this.speed+=amount;
	
}

Character.prototype.changeSanity = function(amount)
{
	
	this.sanity+=amount;
}

Character.prototype.addItem = function(item)
{
	this.inventory.push(item);
	
}

Character.prototype.addMessage = function(message)
{
	this.messagestLog.push(message);
	
}
