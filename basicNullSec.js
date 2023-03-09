/** 
 * @param {NS} ns
 * @param {string} hostName
 * **/
export async function main(ns) {
    if (targetName === undefined) {
        ns.tprint("Missing server name. Usage: `run basicNullSec.js n00dles`");
        ns.exit();
        return;
    };

	var hostName = ns.args[0];

	while(true){
		var currentSecLevel = await ns.getServerSecurityLevel(hostName);
		var targetSecLevel = (1.25 * await ns.getServerMinSecurityLevel(hostName));
		if(currentSecLevel > targetSecLevel){
			ns.print(`! Weakening sec from ${currentSecLevel} to target ${targetSecLevel}...`);
			await ns.weaken(hostName);
		}

		var targetMoneyLevel = (0.75 * ns.getServerMaxMoney(hostName));
		var currentMoneyLevel = await ns.getServerMoneyAvailable(hostName);
		if(currentMoneyLevel > targetMoneyLevel){
			ns.print("! Hacking...");
			await ns.hack(hostName);
		}
		else{
			ns.print(`! Growing money from ${currentMoneyLevel} to target ${targetMoneyLevel}...`);
			await ns.grow(hostName);
		}		
	}
}