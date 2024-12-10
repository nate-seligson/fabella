import { Story } from "./story.js";
import { turnPage, goBack } from "./pageturner.js";
import { updateCountdown } from "./countdown.js";
const x = new Story();
document.getElementById("next").addEventListener("click", function(){turnPage(x)})
document.getElementById("back").addEventListener("click", function(){goBack(x)})

x.writeSlice("l", 0);
x.writeSlice("r",1);

(async() => {await x.checkLoaded();
    document.getElementById("pagecount").innerHTML = `Page 0   out of ${x.maxPages + 1}`
})();
setInterval(function(){document.getElementById("timer").innerHTML = updateCountdown()}, 1000);
updateCountdown();
