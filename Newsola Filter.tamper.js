// ==UserScript==
// @name       Newsola Filter
// @namespace  http://www.jaredwilliams.com
// @version    0.1
// @description  Filters headlines from Newsola to suit what you do or do not want to read.
// @match      *newsola.com*
// @copyright  2012+, You
// ==/UserScript==

console.log('Running Newsola Filter userscript');

$(document).ajaxComplete(function() {
	var cells, badwords, badword, numremoved = 0;
    
    //Our list of words to remove headlines...
    badwords = ['dead', 'killed', 'murder', 'death', 'shoot', 'fire'];
    
    //Get each cell...
    cells = $('A.block');
    
    cells.each(function() {
        var cell = $(this), headline;
        
        //Get our headline...
        headline = cell.find('SPAN.link-text').text().toLowerCase();
        
        //If our headline contains "bad" words...
        for (i=0; i<badwords.length; i++) {
        	badword = badwords[i].toLowerCase();
            
    		if (headline.indexOf(badword) >= 0) {
                numremoved++;
                
            	cell.remove();   
            }
        }
    });
    
    console.log('News headlines filtered (' + numremoved + ' removed)');
    
    //Tell Newsola to resize now that we've made our changes...
    resizeBlocks();
});