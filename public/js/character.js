'use strict'

class Character {
  constructor (name, portraitImage, maxHp, power, speed, sanity) {
    this.name = name
    this.portraitImage = new Image()
    this.portraitImage.src = portraitImage
    this.portraitImageReady = false
    var temp = this
    this.portraitImage.onload = function () {
      temp.portraitImageReady = true
    }
    this.currentHp = maxHp
    this.maxHp = maxHp
    this.power = power
    this.speed = speed
    this.sanity = sanity
    this.inventory = []
    this.messagesLog = []
    // might be moved outside of this class
    this.itemsPointer = 0
    this.chatPointer = 0
  }

  changeHp (amount) {
    this.currentHp += amount
  }

  changePower (amount) {
    this.power += amount
  }

  changeSpeed (amount) {
    this.speed += amount
  }

  changeSanity (amount) {
    this.sanity += amount
  }

  /**
   * place of the item in the inventory list
   * @param {*} item 
   */
  addItem (item) {
    this.inventory.push(item)
  }

  /**
   * place of the item in the inventory list
   * @param {*} item 
   */
  removeItem (item) {
    this.inventory.splice(item, 1)
    // this part should be removed if we don't use a scrollable item bar
    if (item < this.itemsPointer)	{
      this.itemsPointer--
    } else {
      // if it is removing an item before the half of the viewed items
      if (item < this.itemsPointer + 2) {
        this.itemsPointer--
      } else {
        if (!(this.itemsPointer < this.inventory.length - 4))	{
          this.itemsPointer--
        } else {
          // Do nothing
        }
      }
    }

    if (this.itemsPointer < 0) {
      this.itemsPointer = 0
    }
  }

  addMessage (message) {
    this.messagesLog.push(message)
  }

  /**
   * assumming that we are viewing 4 items
   */
  scrollItemsRight () {
    if (this.inventory.length > 4) {
      // you can only move if the items being viewed will not go byoned the last postion
      if (this.itemsPointer < this.inventory.length - 4) {
        this.itemsPointer++
      }
    }
  }

  scrollItemsLeft () {
    if (this.itemsPointer > 0) {
      this.itemsPointer--
    }
  }
}

module.exports = {
  Character: Character
}

// function Character () {
//   this.name
//   this.portraitImage
//   this.portraitImageReady
//   this.currentHp
//   this.maxHp
//   this.power
//   this.speed
//   this.sanity
//   this.inventory
//   this.messagesLog

//   // might be moved outside of this class
//   this.itemsPointer
//   this.chatPointer
// }

// Character.prototype.setUp = function (name, portraitImage, maxHp, power, speed, sanity) {
//   this.name = name
//   this.portraitImage = new Image()
//   this.portraitImage.src = portraitImage
//   this.portraitImageReady = false
//   var temp = this
//   this.portraitImage.onload = function () {
//     temp.portraitImageReady = true
//   }
//   this.currentHp = maxHp
//   this.maxHp = maxHp
//   this.power = power
//   this.speed = speed
//   this.sanity = sanity
//   this.inventory = []
//   this.messagesLog = []
//   this.itemsPointer = 0
//   this.chatPointer = 0
// }

// Character.prototype.changeHp = function (amount) {
//   this.currentHp += amount
// }

// Character.prototype.changePower = function (amount) {
//   this.power += amount
// }

// Character.prototype.changeSpeed = function (amount) {
//   this.speed += amount
// }

// Character.prototype.changeSanity = function (amount) {
//   this.sanity += amount
// }

// Character.prototype.addItem = function (item)// place of the item in the inventory list
// {
//   this.inventory.push(item)
// }

// Character.prototype.removeItem = function (item)// place of the item in the inventory list
// {
//   this.inventory.splice(item, 1)

//   // this part should be removed if we don't use a scrollable item bar
//   if (item < this.itemsPointer)	{
//     this.itemsPointer--
//   }	else	{
//     if (item < this.itemsPointer + 2) // if it is removing an item before the half of the viewed items
//     {
//       this.itemsPointer--
//     }				else		{
//       if (!(this.itemsPointer < this.inventory.length - 4))			{
//         this.itemsPointer--
//       }						else			{
//         // Do nothing
//       }
//     }
//   }

//   if (this.itemsPointer < 0)	{
//     this.itemsPointer = 0
//   }
// }

// Character.prototype.addMessage = function (message) {
//   this.messagesLog.push(message)
// }

// Character.prototype.scrollItemsRight = function () {
//   if (this.inventory.length > 4) // assumming that we are viewing 4 items
//   {
//     if (this.itemsPointer < this.inventory.length - 4) // you can only move if the items being viewed will not go byoned the last postion
//     {
//       this.itemsPointer++
//     }
//   }
// }

// Character.prototype.scrollItemsLeft = function () {
//   if (this.itemsPointer > 0)	{
//     this.itemsPointer--
//   }
// }
