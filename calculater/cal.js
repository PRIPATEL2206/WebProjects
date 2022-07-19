        var queBox=document.querySelector(".ansbox h3");
        var  ansBox = document.querySelector(".ansbox h1");
        var btn=document.getElementsByTagName("button");
       
        function replaceAll(s){
            len=s.length;
            for(var i=0;i<len/2;i++){
                s=s.replace("^","**").replace("%","*100").replace("X","*");
            }
            return s;
        }
        function display(){
            // butten pressed 
            buttonText=this.textContent;
           
            //for C
            if(buttonText=='C'){
                if(queBox.textContent!="0"){
                    queBox.textContent=queBox.textContent.substring(0,queBox.textContent.length-1);
                    if(queBox.textContent==""){
                        queBox.textContent="0";
                    }

                    try{
                        ansBox.textContent=eval(replaceAll(queBox.textContent));
                        console.log(queBox.textContent)
                      }
                      catch(e){
                          
                      }
                }
                return;
            }

            //for =
            if(buttonText=='='){
                try{
                  ansBox.textContent=eval(replaceAll(queBox.textContent));
                  console.log(queBox.textContent)
                }
                catch(e){
                    console.log(e);
                    ansBox.textContent="INVALID SYNTEX";
                }
                return;
            }

            // for +/-
            if (buttonText=="+/-"){
                if(queBox.textContent[queBox.textContent.length-1]=="-"){
                    // console.log("ok");
                    queBox.textContent=queBox.textContent.substring(0,queBox.textContent.length-1);

                    try{
                        ansBox.textContent=eval(replaceAll(queBox.textContent));
                        console.log(queBox.textContent)
                      }
                      catch(e){
                          
                      }
                    return; 
                }
                buttonText="-"
                // console.log(queBox.textContent[queBox.textContent.length-1]);

            }
            // for CE
            if(buttonText=="CE"){
                queBox.textContent="0";
                ansBox.textContent="0";
                return;
            }

            // for ans
            if(buttonText=="ans"){
                if(ansBox.textContent!="0"){
                queBox.textContent+=ansBox.textContent;
            }
            return;
            }
            
            // for . and 0
            if(queBox.textContent=="0"&& buttonText!="."){
                queBox.textContent=""
            }
          
            queBox.textContent+=buttonText;

            try{
                ansBox.textContent=eval(replaceAll(queBox.textContent));
                console.log(queBox.textContent)
              }
              catch(e){
                  
              }

        }
        console.log(queBox)

        for(node of btn){
            node.addEventListener("click",display);
        }