/** 
 * @param {NS} ns
 * @param {string} target
 * **/
export async function main(ns) {
	var target = ns.args[0];
	if (target === undefined) {
        ns.tprint("Missing server name. Usage: `run propagate.js n00dles`");
        ns.exit();
    };

	//Copy all three basic scripts to the target
	var result = ns.scp(["claimServer.js", "basicNullSec.js", "propagate.js"], target, ns.getCurrentServer);
	if(!result){
		ns.tprint("Failed to copy files!");
		ns.exit();
	}

	//move context to the new server
	var server = ns.getServer(target);

}