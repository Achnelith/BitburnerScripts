/** @param {NS} ns */
export async function main(ns) {
  let neighbors = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "hong-fang-tea", "harakiri-sushi", "iron-gym"];
  ns.tprint("Starting  . . .");
  neighbors.forEach(n => {
    var pid = ns.run("claimServer.js", 1, n);
     
    if(pid == 0) {
      ns.tprint("Failed to start on " + n);
      return;
    }
  });
}