
class State{

    constructor(jx,kx){
        this.jx=jx    
        this.kx=kx
    }
}
function converttoBinary(n,k){
    let number=""
    number=(n >>> 0).toString(2);
    if(number.length<k){
        temp="0"
        number=temp.repeat(k-number.length)+number;
    }
    return number;
}

function processPulses(states,bits,before_pulses,after_pulses,pulses){
    ns=states;
    nb=bits;
    
    for(let i=0;i<ns;i++){
        if(pulses[i]==1){
            let number=converttoBinary(i,nb);

            
            for(let index=0;index<nb;index++){
                    before_pulses[i][index]=number[index];
            }
            let j=i+1;
            while(j<ns){
                if(pulses[j]==1){
                    let number=converttoBinary(j,nb);
                    
                  
                    for(let index=0;index<nb;index++){
                        after_pulses[i][index]=number[index];
                    }

                    break;
                }
                j++;
            }
        }
        let number=converttoBinary(i,nb);
       
        for(let index=0;index<nb;index++){
            before_pulses[i][index]=number[index];
        }
                    
    }
}
function stateTransition(x,y){
    let state=new State(0,0);
    if(x==0 && y==0){
        state.jx='0';
        state.kx='x';
    } 
    else if(x==0 && y==1){
        state.jx='1';
        state.kx='x';
    }
    else if(x==1 && y==1){
        state.jx='x';
        state.kx='0';
    }
    else if(x==1 && y==0){
        state.jx='x';
        state.kx='1';
    }
    return state;
}
function jkConfig(states,bits,beforePulses,afterPulses,j,k){
        let ns=states;
        let nb=bits;
        for(let i=0;i<ns;i++){
          for(let p=0;p<nb;p++){    
            j[i][p]=stateTransition(beforePulses[i][p],afterPulses[i][p]).jx;
            k[i][p]=stateTransition(beforePulses[i][p],afterPulses[i][p]).kx;
          }
        }
}

let pulses=new Array(16).fill(0);
let before_pulses=new Array(16).fill(0).map(() => new Array(4).fill(0));

let after_pulses=new Array(16).fill(0).map(() => new Array(4).fill(0));
let j=new Array(16).fill(0).map(() => new Array(4).fill(0));
let k=new Array(16).fill(0).map(() => new Array(4).fill(0));



let n;


function process_inputs(){
    let inputs=document.getElementById('numbers').value;
    let num=inputs.split(",").filter(x => x.trim().length && !isNaN(x)).map(Number)
    for(let i=0;i<num.length;i++){
        if(num[i]>=0 && num[i]<=15) pulses[num[i]]=1;
    }
  
    
}
function process(){
    
    document.getElementById("paragraph").innerHTML="";
    let state_input=document.getElementById('4bit').checked;
    
    let states=8;
    let bits=3;
    table_header_1="<tr><th>C</th><th>B</th><th>A</th><th>C</th><th>B</th><th>A</th>"
    table_header_2="<th>JC</th><th>KC</th><th>JB</th><th>KB</th><th>JA</th><th>KA</th></tr>"
    console.log(state_input)
    if(state_input==true){
        states=16;
        bits=4;
        table_header_1="<tr><th>D</th><th>C</th><th>B</th><th>A</th><th>D</th><th>C</th><th>B</th><th>A</th>"
        table_header_2="<th>JD<th>KD</th><th>JC</th><th>KC</th><th>JB</th><th>KB</th><th>JA</th><th>KA</th></tr>"
        
    }

    process_inputs(pulses);
    processPulses(states,bits,before_pulses,after_pulses,pulses);
    jkConfig(states,bits,before_pulses,after_pulses,j,k);
    
    
    result="" 
    for(let i=0;i<states;i++){
        result+="<tr>"
        for(let j=0;j<bits;j++){
            result+="<td>"+before_pulses[i][j]+"</td>";

        }
        //result+="&nbsp";
        for(let j=0;j<bits;j++){
            result+="<td>"+after_pulses[i][j]+"</td>";
        }
        //result+="&nbsp";
        for(let l=0;l<bits;l++){
            result+="<td>"+j[i][l]+"</td>";
            result+="<td>"+k[i][l]+"</td>";

        }
        result+="</tr>";
    }
    document.getElementById("paragraph").innerHTML="<table border='1' align='center'>"+table_header_1+table_header_2+result+"</table>";

   
}

    



