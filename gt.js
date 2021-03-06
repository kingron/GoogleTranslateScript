/*
  Author: Kingron
  Date: 2017-7-6
*/
String.prototype.trim = function()
{
    // 用正则表达式将前后空格
    // 用空字符串替代。
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

function b(a, b) {
	for (var d = 0; d < b.length - 2; d += 3) {
		var c = b.charAt(d + 2),
			c = "a" <= c ? c.charCodeAt(0) - 87 : Number(c),
			c = "+" == b.charAt(d + 1) ? a >>> c : a << c;
		a = "+" == b.charAt(d) ? a + c & 4294967295 : a ^ c
	}
	return a
}

function tk(a,TKK) {
	for (var e = TKK.split("."), h = Number(e[0]) || 0, g = [], d = 0, f = 0; f < a.length; f++) {
		var c = a.charCodeAt(f);
		128 > c ? g[d++] = c : (2048 > c ? g[d++] = c >> 6 | 192 : (55296 == (c & 64512) && f + 1 < a.length && 56320 == (a.charCodeAt(f + 1) & 64512) ? (c = 65536 + ((c & 1023) << 10) + (a.charCodeAt(++f) & 1023), g[d++] = c >> 18 | 240, g[d++] = c >> 12 & 63 | 128) : g[d++] = c >> 12 | 224, g[d++] = c >> 6 & 63 | 128), g[d++] = c & 63 | 128)
	}
	a = h;
	for (d = 0; d < g.length; d++) a += g[d], a = b(a, "+-a^+6");
	a = b(a, "+-3^+b+-f");
	a ^= Number(e[1]) || 0;
	0 > a && (a = (a & 2147483647) + 2147483648);
	a %= 1E6;
	return a.toString() + "." + (a ^ h)
}

function isChinese(str){
	if(/^[\u3220-\uFA29]+$/.test(str)){
		return true;
	}else{
		return false;
	}
}

var args = WScript.Arguments;
if (args.length == 0) WScript.Quit(-1);

var http = new ActiveXObject("Msxml2.XMLHTTP")
http.open("GET", "https://translate.google.com", false)
http.send();
var text = http.responseText
var start = text.indexOf(";TKK=");
var end = text.indexOf("(a+b)})())');")

if (start >=0 && end >= 0)
{
	var sl, tl;
	var words = "";
	for (i = 0; i < args.length; i++) 
	{
	  words += args.item(i).trim() + " ";
	}
	words = words.trim();
	var tkk = 0.0;
	var url = ""
	var sub = text.substring(start + 5, end + 13);
	tkk = eval(sub);
	var new_tk = tk(words, tkk);
	
	if (isChinese(words)) {
		sl = "zh-CN";
		tl = "en";
	}
	else {
		sl = "en"
		tl = "zh-CN"
	}
	
	url = "https://translate.google.com/translate_a/single?client=t&sl=" + sl + "&tl=" + tl + "&hl=en&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&ie=UTF-8&oe=UTF-8&otf=1&tk=" + new_tk + "&q=" + encodeURI(words);
	
	http.open("GET", url, false);
	http.send();
	text = http.responseText;
	// WScript.Echo(text);
	var trans = eval(text);
	var msg = "";
	
	for (i = 0; i <= trans.length - 1; i++ ) {
		if (i==2 || i==3 || i==4 || i==6 || i==7 || i==8 || i==9 || i==10 || i==14) continue;
		if (trans[i] != null) 
			msg += trans[i].toString() + "\r\n-----------\r\n";
	}		
	WScript.Echo(msg);
	WScript.Quit(0);
}
else
{
	WScript.Quit(-1);
}
