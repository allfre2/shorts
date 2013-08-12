/* 
`shorts' -- URL shortener -- A google's chromium browser 
extention intended to provide easy access to google's URL 
shortener API.

Copyright (C) 2013  Alfredo Luzon 

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/
var title = "shorts"
var googl = document.getElementById("_");
var APIUrl = "https://www.googleapis.com/urlshortener/v1/url";
var xhr = new XMLHttpRequest();
var response;

function shortURL(url){

 xhr.open("POST",APIUrl);
 xhr.setRequestHeader("Content-type","application/json");

 xhr.onload = function () {
  response = JSON.parse(xhr.responseText);
  if(!response.error){
     googl.value = response.id;
     googl.focus();
     googl.select();
     document.execCommand("copy");
     googl.value = "";
  }else alert("Failed!"); 
 };
 xhr.send( "{ longUrl: \"" + url + "\" }" );
} 

function selection(info,tab){
 shortURL(info.selectionText);
}

function page(info,tab){
 shortURL(info.pageUrl);
}
function link(info,tab){
 shortURL(info.linkUrl);
}

chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                       "onclick": selection});

chrome.contextMenus.create({"title": title, "contexts":["page"],
                                       "onclick": page});

chrome.contextMenus.create({"title": title, "contexts":["link"],
                                       "onclick": link});

