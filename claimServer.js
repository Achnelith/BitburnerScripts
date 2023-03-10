  /**
   * @param {NS} ns
   * @param {string} target
   **/
  export async function main(ns) {
    var targetName = ns.args[0];
  
    if (targetName === undefined) {
      ns.tprint("Missing server name. Usage: `run claimServer.js n00dles`");
      ns.exit();
    };
  
    let target = await fetchServer(ns, targetName);
    let exes = await scanExes(ns);
    let result = root(ns, target, exes);

    if(!result){
      ns.tprint("Failed to aquire sudo.");
      ns.exit();
    }

    ns.tprint("Sudo aquired!");
    ns.tprint("Copying core scripts . . .");

    //Copy core scripts to target
    ns.run("propagate.js", 1, targetName);

    //Start nullsec with max threads
    startBasicNullsec(ns, targetName);
  }

/**
 * @param {NS} ns
 * @param {string} targetName
 **/
function startBasicNullsec(ns, targetName) {
    ns.killall(targetName);
    let cost = ns.getScriptRam("basicNullSec.js", targetName);
    let max = ns.getServerMaxRam(targetName);
    let used = ns.getServerUsedRam(targetName);

    let threads = Math.floor(((max - used) - 5.2) / cost);

    ns.tprint(" " + cost + " " + max + " " + used + " " + threads);

    if(threads < 1) {
      ns.tprint("Not enough RAM to propagate on " + targetName);
    }

    if(ns.exec("basicNullSec.js", targetName, threads, targetName) > 0){
      ns.tprint("Stacking paper on " + targetName);
    }
    else{
      ns.tprint("Failed to start basicNullSec on " + targetName);
    }
}

/**
 * @param {NS} ns
 * @param {serverObj} targetObj
 * @param {string[]} exes
 **/
export function root (ns, targetObj, exes) {
    if (targetObj.hasAdminRights) {
      ns.tprint("Already have root.");
      return true;
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
  
    return ns.nuke(targetObj.name);
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