
guidedModel =// @startlock
{
	User :
	{
		methods :
		{// @endlock
			createUser:function(passedUserName)
			{// @lock
				var dirUserTest = directory.user(passedUserName);
				if(dirUserTest==null)
				{
					var newUser = ds.User.createEntity();
					newUser.userName = passedUserName; //'NewUser'+newUser.ID;
					var dirUser = directory.addUser(newUser.userName, '', newUser.userName);
					directory.save();
					newUser.userDirectoryID = dirUser.ID;
					newUser.fullName = passedUserName;
					newUser.save();	
					return newUser;			
				}


			}// @startlock
		},
		events :
		{
			onRemove:function()
			{// @endlock
				// remove from directory
				var thisUser = directory.user(this.userDirectoryID);
				thisUser.remove();
				directory.save();  //

			},// @startlock
			onSave:function()
			{// @endlock
				var thisUser = directory.user(this.userDirectoryID);
				
				//if(thisUser==null)
				//{
				//	
				//	//var userName = generateUUID(); //this.userName+this.ID;
				//	thisUser = directory.addUser(this.userName, this.password, this.fullName);
				//	//directory.save();
				//
				//	this.userDirectoryID=thisUser.ID;
				//	//this.fullName=this.userDirectoryID;
				//}
				//thisUser.name = this.userName;
				thisUser.setPassword(this.password);
				//thisUser.fullName = this.fullName;
				if(this.isAdmin)
				{
					thisUser.putInto("admin");
				}
				else
				{
					thisUser.removeFrom("admin");
				}
				
				directory.save();
				
			}// @startlock
		}
	}
};// @endlock
