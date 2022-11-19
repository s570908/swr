# Convert a JavaScript string in dot notation into an object reference

https://stackoverflow.com/questions/6393943/convert-a-javascript-string-in-dot-notation-into-an-object-reference

```JS
Other proposals are a little cryptic, so I thought I'd contribute:

Object.prop = function(obj, prop, val){
    var props = prop.split('.')
      , final = props.pop(), p 
    while(p = props.shift()){
        if (typeof obj[p] === 'undefined')
            return undefined;
        obj = obj[p]
    }
    return val ? (obj[final] = val) : obj[final]
}

var obj = { a: { b: '1', c: '2' } }

// get
console.log(Object.prop(obj, 'a.c')) // -> 2
// set
Object.prop(obj, 'a.c', function(){})
console.log(obj) // -> { a: { b: '1', c: [Function] } }
Share
Follow
answered Jun 18, 2011 at 6:00
Ricardo Tomasi's user avatar
Ricardo Tomasi
33.9k22 gold badges5555 silver badges6666 bronze badges
An explanation would be in order. Please respond by editing (changing) your answer, not here in comments (without "Edit:", "Update:", or similar - the answer should appear as if it was written today). – 
Peter Mortensen
 Aug 22, 2021 at 15:27
@PeterMortensen you're about ten years late. I don't think this answer is particularly good anymore either way. – 
Ricardo Tomasi
 Jun 13 at 15:16 
 ```