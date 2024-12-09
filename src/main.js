import { Story } from "./story.js";
import { turnPage } from "./pageturner.js";
const x = new Story();
document.getElementById("next").addEventListener("click", function(){turnPage(x)})
turnPage(x);