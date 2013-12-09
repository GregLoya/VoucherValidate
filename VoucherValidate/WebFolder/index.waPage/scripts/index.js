
WAF.onAfterInit = function onAfterInit() {// @lock
	

// @region namespaceDeclaration// @startlock
	var fileUpload1 = {};	// @fileUpload
	var login1 = {};	// @login
	var textField6 = {};	// @textField
	var bSearch = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	fileUpload1.filesUploaded = function fileUpload1_filesUploaded (event)// @startlock
	{// @endlock
		sources.voucher.importVouchers();
	};// @lock

	
	setObjVisibility();

	function setObjVisibility() {
		if (WAF.directory.currentUser()!=null) {
           $$('body').show();
       	} else {
           $$('body').hide();
       	}
       	
		if (WAF.directory.currentUserBelongsTo('Admin')) {
           $$('fileUpload1').show();
       	} else {
           $$('fileUpload1').hide();
       	}       	
       	
	}
	
	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		setObjVisibility();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		setObjVisibility();
	};// @lock
	
	function doSearch() {
		sources.voucher.query('voucherNumber === :1',{onSuccess: 
			function(event)
				{
					var resultWidget=$$('validResult');
					if(sources.voucher.length==0)
						{
							resultWidget.setValue("# "+[queryStr]+" INVALID");
  							resultWidget.setTextColor("red");
						}
					else
						{
							resultWidget.setValue("# "+[queryStr]+" VALID");
							resultWidget.setTextColor("green");
						}
				}
			,params : [queryStr]});	
	}	
	
	textField6.keyup = function textField6_keyup (event)// @startlock
	{// @endlock
		if(event.keyCode==13){
			doSearch();
		}
	};// @lock

	bSearch.click = function bSearch_click (event)// @startlock
	{// @endlock

		doSearch();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("fileUpload1", "filesUploaded", fileUpload1.filesUploaded, "WAF");
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("textField6", "keyup", textField6.keyup, "WAF");
	WAF.addListener("bSearch", "click", bSearch.click, "WAF");
// @endregion
};// @endlock
