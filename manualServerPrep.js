/**
 * @param {NS} ns
 * @param {string} targetName
 **/
export async function main(ns) {
	var targetName = ns.args[0];
	var currentServer = ns.getHostname();
  
    if (targetName === undefined) {
      ns.tprint("Missing server name. Usage: `run manualServerPrep.js n00dles`");
      ns.exit();
    };

    let cost = ns.getScriptRam("basicNullSec.js");
    let max = ns.getServerMaxRam(currentServer);
    let used = ns.getServerUsedRam(currentServer);
    let available = max - used;
    let threads = Math.floor(available / cost);

    if(cost == 0){
      ns.tprint("basicNullSec.js not found.");
      return;
    }

    if(threads < 1) {
      ns.tprint("Not enough RAM to prep " + targetName + " on " + currentServer + " (" + available + " available, " + cost + " min)" );
      return;
    }

    if(ns.run("basicNullSec.js", threads, targetName) > 0){
      ns.tprint("Stacking paper on " + targetName + " (" + threads + " threads, " + available + " RAM used)");
    }
    else{
      ns.tprint("Failed to start basicNullSec targeting " + targetName);
    }
}