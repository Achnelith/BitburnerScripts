  /**
   * @param {NS} ns
   * @param {string} target
   **/
  export async function main(ns) {
    var targetName = ns.args[0];
  
    if (targetName === undefined) {
      ns.tprint("Missing server name. Usage: `run claimServer.js n00dles`");
      ns.exit();
      return;
    };
  
    let target = await fetchServer(ns, targetName);
    let exes = await scanExes(ns);
    root(ns, target, exes);
  }

/**
 * @param {NS} ns
 * @param {serverObj} targetObj
 * @param {string[]} exes
 **/
export function root (ns, targetObj, exes) {
    if (targetObj.hasAdminRights) {
      ns.tprint("Already have root.");
      return;
    };
  
    if ( targetObj.portsRequired > exes.length) {
      ns.tprint("Not enough tools to nuke " + targetObj);
      return;
    };
  
    if (exes.includes("BruteSSH")) {
      ns.brutessh(targetObj.name);
    };
    if (exes.includes("FTPCrack")) {
      ns.ftpcrack(targetObj.name);
    };
    if (exes.includes("HTTPWorm")) {
      ns.httpworm(targetObj.name);
    };
    if (exes.includes("relaySMTP")) {
      ns.relaysmtp(targetObj.name);
    };
    if (exes.includes("SQLInject")) {
      ns.sqlinject(targetObj.name);
    };
  
    var ret = ns.nuke(targetObj.name);
    ns.tprint("Sudo aquired: " + ret);
  }
  
  /**
   * @param {NS} ns
   **/
  async function scanExes(ns) {
    let exes = ["BruteSSH", "FTPCrack", "relaySMTP", "SQLInject", "HTTPWorm"];
    for (let i = 0; i <= exes.length - 1; i++)
    {
      if (!ns.fileExists(exes + ".exe"))
      {
        exes.splice(i, 1);
        i--;
      }
    }
  
    return exes;
  }
  
  /**
   * @param {NS} ns
   * @param {string} target
   **/
  async function fetchServer(ns, targetName) {
      let serverObj = {
        name: targetName,
        portsRequired: ns.getServerNumPortsRequired(targetName),
        hasAdminRights: ns.hasRootAccess(targetName)
        //hackingLvl: ns.getServerRequiredHackingLevel(server)
      };
  
      return serverObj;
  }