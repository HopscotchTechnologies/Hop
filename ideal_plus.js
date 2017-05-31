

// Proto

ideal.Proto.isKindOf = function (aProto) {
  if (this.__proto__) {
    if (this.__proto__  === aProto) {
      return true
    }

    if (this.__proto__.isKindOf) {
      return this.__proto__.isKindOf(aProto)
    }
  }
  return false
}


/// Array

Array.prototype.select = function(callback) {
    var results = []

  for (var i = 0; i < this.length; i++)
  {
      var v = this[i];

    if(callback(v))
    {
      results.push(v)
    }
  }

  return results;
}


Array.prototype.after = function(v)
{
  var index = this.indexOf(v);

  if(index == -1)
  {
    return [];
  }

  return this.slice(index + 1);
}

Array.prototype.before = function(v)
{
  var index = this.indexOf(v);

  if(index == -1)
  {
    return this.slice();
  }

  return this.slice(0, index);
}

/// String

String.prototype.capitalizeWords = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
    });
};

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};


String.prototype.loremIpsum = function (minWordCount, maxWordCount) {
    if (!minWordCount) { minWordCount = 10; }
    if (!maxWordCount) { maxWordCount = 40; }

  var loremIpsumWordBank = new Array("lorem","ipsum","dolor","sit","amet,","consectetur","adipisicing","elit,","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua.","enim","ad","minim","veniam,","quis","nostrud","exercitation","ullamco","laboris","nisi","ut","aliquip","ex","ea","commodo","consequat.","duis","aute","irure","dolor","in","reprehenderit","in","voluptate","velit","esse","cillum","dolore","eu","fugiat","nulla","pariatur.","excepteur","sint","occaecat","cupidatat","non","proident,","sunt","in","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum.","sed","ut","perspiciatis,","unde","omnis","iste","natus","error","sit","voluptatem","accusantium","doloremque","laudantium,","totam","rem","aperiam","eaque","ipsa,","quae","ab","illo","inventore","veritatis","et","quasi","architecto","beatae","vitae","dicta","sunt,","explicabo.","nemo","enim","ipsam","voluptatem,","quia","voluptas","sit,","aspernatur","aut","odit","aut","fugit,","sed","quia","consequuntur","magni","dolores","eos,","qui","ratione","voluptatem","sequi","nesciunt,","neque","porro","quisquam","est,","qui","dolorem","ipsum,","quia","dolor","sit,","amet,","consectetur,","adipisci","velit,","sed","quia","non","numquam","eius","modi","tempora","incidunt,","ut","labore","et","dolore","magnam","aliquam","quaerat","voluptatem.","ut","enim","ad","minima","veniam,","quis","nostrum","exercitationem","ullam","corporis","suscipit","laboriosam,","nisi","ut","aliquid","ex","ea","commodi","consequatur?","quis","autem","vel","eum","iure","reprehenderit,","qui","in","ea","voluptate","velit","esse,","quam","nihil","molestiae","consequatur,","vel","illum,","qui","dolorem","eum","fugiat,","quo","voluptas","nulla","pariatur?","at","vero","eos","et","accusamus","et","iusto","odio","dignissimos","ducimus,","qui","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti,","quos","dolores","et","quas","molestias","excepturi","sint,","obcaecati","cupiditate","non","provident,","similique","sunt","in","culpa,","qui","officia","deserunt","mollitia","animi,","id","est","laborum","et","dolorum","fuga.","harum","quidem","rerum","facilis","est","et","expedita","distinctio.","Nam","libero","tempore,","cum","soluta","nobis","est","eligendi","optio,","cumque","nihil","impedit,","quo","minus","id,","quod","maxime","placeat,","facere","possimus,","omnis","voluptas","assumenda","est,","omnis","dolor","repellendus.","temporibus","autem","quibusdam","aut","officiis","debitis","aut","rerum","necessitatibus","saepe","eveniet,","ut","et","voluptates","repudiandae","sint","molestiae","non","recusandae.","itaque","earum","rerum","hic","tenetur","a","sapiente","delectus,","aut","reiciendis","voluptatibus","maiores","alias","consequatur","aut","perferendis","doloribus","asperiores","repellat");

  var randy = Math.floor(Math.random()*(maxWordCount - minWordCount)) + minWordCount;
  var ret = "";
  for(i = 0; i < randy; i++) {
    var newTxt = loremIpsumWordBank[Math.floor(Math.random() * (loremIpsumWordBank.length - 1))];
    if (ret.substring(ret.length-1,ret.length) == "." || ret.substring(ret.length-1,ret.length) == "?") {
      newTxt = newTxt.substring(0,1).toUpperCase() + newTxt.substring(1, newTxt.length);
    }
    ret += " " + newTxt;
  }

    return ret
},


/// Array

Array.prototype.itemsBefore = function(item) {
    var index = this.indexOf(item);
    if (index != -1) {
        return this.slice(0, index);
    }
    return this
};

Array.prototype.union = function(a)
{
    var r = this.slice(0);
    a.forEach(function(i) { if (r.indexOf(i) < 0) r.push(i); });
    return r;
};

Array.prototype.diff = function(a)
{
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

if(Array.prototype.equals) {
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

/// Object

Object.prototype.slotNames = function() {
  var keys = [];
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      keys.push(k);
    }
  }
  return keys;
}

Object.prototype.slotValues = function() {
  var values = [];
  for (var k in this) {
    if (this.hasOwnProperty(k)) {
      values.push(this[k]);
    }
  }
  return values;
}

