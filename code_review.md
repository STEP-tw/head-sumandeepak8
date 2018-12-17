### library.js
```
10            getHead() name is confusing 
17            unused parameter
19            long condition 
29            extractOptionAndCount() is too long and so many unnamed conditions
30            let output : poor variable name
57            extractInputs(): poor variable name
65,73         funcRef : 
86            filesDataExtractingFunctions() : function name and key names can be changed
105           output() : poor function name
130           checkValidation() : should be inputValiation.

parseInput and inputValidations should be in different file.
```
### utilLibrary.js
```
utilLib contains non util functions.

```
### libraryTest.js 
```
15          readContent() is simply a identity function.
19          existSync() is a truthy function.
23          selectDelimiter is unused function.
32,36       description is poor.
55          description is too lengthy.
175         expectedOutput can be stored in a variable.
```