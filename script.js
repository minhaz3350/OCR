const imageInput=document.getElementById('imageInput');
const preview=document.getElementById('preview');

const unicodeText=document.getElementById('unicodeText');
const sutonnyText=document.getElementById('sutonnyText');

const loader=document.getElementById('loader');
const progressContainer=document.getElementById('progressContainer');
const progressBar=document.getElementById('progressBar');

imageInput.addEventListener('change',()=>{

const file=imageInput.files[0];

if(file){

preview.src=URL.createObjectURL(file);
preview.style.display='block';

}

});

async function scanText(){

const file=imageInput.files[0];

if(!file){

alert('Please upload image first');
return;

}

loader.innerHTML='⏳ Scanning Bangla Text...';
progressContainer.style.display='block';

const result=await Tesseract.recognize(

file,
'ben',

{

logger:m=>{

if(m.status==='recognizing text'){

let progress=Math.floor(m.progress*100);

progressBar.style.width=progress+'%';

loader.innerHTML='⏳ OCR Processing '+progress+'%';

}

}

}

);

unicodeText.value=result.data.text;

loader.innerHTML='✅ OCR Scan Completed';
progressBar.style.width='100%';

setTimeout(()=>{

progressContainer.style.display='none';

},1000);

}

function convertText(){

const text=unicodeText.value;

const map={

'অ':'A',
'আ':'Av',
'ই':'B',
'ঈ':'C',
'উ':'D',
'ঊ':'E',

'এ':'F',
'ঐ':'G',
'ও':'H',
'ঔ':'I',

'ক':'K',
'খ':'L',
'গ':'M',
'ঘ':'N',
'ঙ':'O',

'চ':'P',
'ছ':'Q',
'জ':'R',
'ঝ':'S',
'ঞ':'T',

'ট':'U',
'ঠ':'V',
'ড':'W',
'ঢ':'X',
'ণ':'Y',

'ত':'Z',
'থ':'_',
'দ':'`',
'ধ':'a',
'ন':'b',

'প':'c',
'ফ':'d',
'ব':'e',
'ভ':'f',
'ম':'g',

'য':'h',
'র':'i',
'ল':'j',
'শ':'k',
'ষ':'l',
'স':'m',
'হ':'n',

'া':'v',
'ি':'w',
'ী':'x',
'ু':'y',
'ূ':'z',
'ে':'‡',
'ো':'†',
'্':''

};

let converted='';

for(let char of text){

converted+=map[char]||char;

}

sutonnyText.value=converted;

loader.innerHTML='⚡ Conversion Completed';

}

function copyText(){

const text=sutonnyText;

text.select();

document.execCommand('copy');

alert('Copied Successfully');

}

function downloadText(){

const text=sutonnyText.value;

const blob=new Blob([text],{type:'text/plain'});

const a=document.createElement('a');

a.href=URL.createObjectURL(blob);

a.download='sutonny-text.txt';

a.click();

loader.innerHTML='⬇ File Downloaded';

}
