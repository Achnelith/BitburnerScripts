/**
 * @param {NS} ns
 * @param {boolean} removePurchased
 * **/
export function main(ns, removePurchased) {
	if (removePurchased){
		var purchasedServers = ns.getPurchasedServers();
	}

	const nodes = [];
	dfs(ns, nodes, "home", purchasedServers, removePurchased);
	ns.tprint(nodes);
	
	return [...nodes];
}

/**
 * @param {NS} ns
 * @param {string[]} nodes
 * @param {string} node
 * @param {string[]} purchasedServers
 * **/
function dfs(ns, nodes, node, purchasedServers, removePurchased) {
		nodes.push(node);
		for (const neighbor of ns.scan(node)) {
			if (removePurchased) {
				if (!purchasedServers.includes(neighbor)) {
					if (!nodes.includes(neighbor)) {
						dfs(ns, nodes, neighbor, purchasedServers, removePurchased);
					}
				}
			} else {
				if (!nodes.includes(neighbor)) {
					dfs(ns, nodes, neighbor, purchasedServers, removePurchased);
				}
			}
		}
	}