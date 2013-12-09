
guidedModel =// @startlock
{
	Voucher :
	{
		methods :
		{// @endlock
			importVouchers:function()
			{// @lock
 
  // Main function
 function doImportVouchers () {
          		
     /*   The doc. to import is in the solution folder, in a subfolder
         named "voucher_import". We load the full document in one shot  (loadText) 
         and split it in an array (one line = one element).
     */
     var lines = loadText( ds.getDataFolder().path + "voucher_import/vouchers.txt" ).split("\n");
       /*   Declare the variable that will hold the columns of each line.
           We know the columns will be:
            columns[0]   Voucher Number
            columns[1]   Voucher Name
            columns[2]   Date Redeemed
            columns[3]   Redeemed By
            columns[4]   Location
            
     */ 
   var columns = [];
       // Now, loop for each entry in the array  
lines.forEach( function(oneLine) {  
      // Get the columns for current line  
columns = oneLine.split("\t");    
 
      // Get the voucher. Create it if needed.
      var theVoucher = ds.Voucher.find("voucherNumber = :1", columns[0]);
      if(theVoucher == null) { // Not found => create it
           theVoucher = new ds.Voucher({
            voucherNumber : columns[0],
            name    : columns[1],
            dateRedeemed    : new Date(columns[2]),
            redeemedBy    : columns[3],
            location    : columns[4]
         });
         // Save it  
         theVoucher.save();
           }    
     });
 }
 // Call the function 
doImportVouchers ();
  
			}// @startlock
		}
	}
};// @endlock
