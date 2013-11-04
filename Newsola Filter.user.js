// ==UserScript==
// @name		Newsola Filter
// @namespace	http://www.jaredwilliams.com.au
// @version		0.1.1
// @description	Filters headlines from Newsola to suit what you do or do not want to read.
// @include		*newsola.com*
// @exclude		*newsola.com/get*
// @copyright	2012+, You
// ==/UserScript==	


console.log('Running Newsola Filter userscript');


function saveBadWord(Word) {
    var current = [];
    
    //Our current words...
    current = getBadWords();
    
    //Append...
    current[current.length] = Word;
    
    //Save...
    saveBadWords(current);
    
    console.log('Bad word "' + Word + '" saved');
}


function saveDefaultWords() {
    var defaults = [];
    
    //Our defaults...
    defaults = ['dead', 'killed', 'murder', 'death', 'shoot', 'fire'];
    
    for (i=0; i<defaults.length; i++) {
    	saveBadWords(defaults);
    }
    
    console.log('Default words saved');
}


function saveBadWords(Words) {
    var encoded = '';
    
    //Encode...
    encoded = JSON.stringify(Words);
    
    //Save...
    localStorage.setItem('badwords', encoded);
}


function loadBadWords() {
	var words = '';
    
    //Retrieve...
    words = localStorage.getItem('badwords');

    //Parse...
    if (words) {
        words = JSON.parse(words);
    } else {
       	saveDefaultWords();
        
    	words = loadBadWords();
    }
    
    return words;
}

    
$(document).ajaxComplete(function() {
    var cells, badwords, badword, numremoved = 0;
    
    //Our list of words to remove headlines...
    badwords = loadBadWords();
    
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