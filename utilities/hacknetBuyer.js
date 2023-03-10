/** @param {NS} ns **/
export async function main(ns) {
	while (true) {
		var canUpgradeExisting = false;
		for (var i = 0; i < await ns.hacknet.numNodes(); i++) {
			//If you can upgrade a node LEVEL, do it
			 if (await ns.getPlayer().money > await ns.hacknet.getLevelUpgradeCost(i, 1)) {
				canUpgradeExisting = true; 
				ns.print(`! Upgrading LEVEL for node ${i}...`);
				await ns.hacknet.upgradeLevel(i, 1);
			}
			//If you can upgrade a node RAM, do it
			if (await ns.getPlayer().money > await ns.hacknet.getRamUpgradeCost(i, 1)) {
				canUpgradeExisting = true;
				ns.print(`! Upgrading RAM for node ${i}...`);
				await ns.hacknet.upgradeRam(i, 1);
			}
			//If you can upgrade a node CORE, do it
			if (await ns.getPlayer().money > await ns.hacknet.getCoreUpgradeCost(i, 1)) {
				canUpgradeExisting = true;
				ns.print(`! Upgrading CORE for node ${i}...`);
				await ns.hacknet.upgradeCore(i, 1);
			}
		}
		//If you can buy a NEW NODE, do it
		if (await ns.getPlayer().money > await ns.hacknet.getPurchaseNodeCost() && !canUpgradeExisting) {
			ns.print('! Purchasing NEW node...');
			await ns.hacknet.purchaseNode();
		}
		//Apparently this prevents crashing :D
		await ns.sleep(1000);
		ns.print('! Hacknet buyer idling...');
	}
}