/**
 * @param {NS} ns
 * @param {boolean} removePurchased
 * **/
export function main(ns, removePurchased) {
	if (removePurchased){
		var purchasedServers = ns.getPurchasedServers();
	}

	const nodes = [];
	dfs(ns, nodes, "home", purchasedServers, removePurchased, 0);
	prettyPrintServers(ns, nodes);
	
	return nodes;
}

/**
 * @param {NS} ns
 * @param {{depth:number, node:string}[]} nodes
 * @param {string} node
 * @param {string[]} purchasedServers
 * @param {number} depth
 * **/
function dfs(ns, nodes, node, purchasedServers, removePurchased, depth) {
		nodes.push({depth, node});

		for (const neighbor of ns.scan(node)) {
			if (removePurchased) {
				if (!purchasedServers.includes(neighbor)) {
					if (nodes.findIndex(x => x.node == neighbor) <= -1) {
						dfs(ns, nodes, neighbor, purchasedServers, removePurchased, depth + 1);
					}
				}
			} else {
				if (nodes.findIndex(x => x.node == neighbor) <= -1) {
					dfs(ns, nodes, neighbor, purchasedServers, removePurchased,  depth + 1);
				}
			}
		}
	}

/**
 * @param {NS} ns
 * @param {{depth:number, node:string}[]} nodes
 **/
function prettyPrintServers(ns, nodes) {
	//ns.tprint(nodes);
	ns.tprint('|', '='.repeat(100), '|');
	nodes.forEach(n => {
		printServerLine(ns, n);
	});
	ns.tprint('|', '='.repeat(100), '|');
}

/**
 * @param {NS} ns
 * @param {{depth:number, node:string}} node
 **/
function printServerLine(ns, node) {
	let line = "|";
	line += "|" + "-".repeat(node.depth * 5);
	line += node.node;
	ns.tprint(line);
}