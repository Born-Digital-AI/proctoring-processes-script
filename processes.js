const os = require('os');
const psList = require('ps-list');

const isWin = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';

const findWinProcesses = async () => [...new Set((await psList()).map((p) => p.name.split('.')[0]))];

const findMacProcesses = async () =>
  (await psList()).filter((p) => p.cmd.includes('Applications') && p.ppid === 1).map((p) => p.cmd.split('/').pop());

const init = async () => {
  let processes = []

  if (isWin) {
    console.log('Monitoring running processes on Windows..')
    processes = await findWinProcesses();
  } else if (isMac) {
    console.log('Monitoring running processes on Mac..')
    processes = await findMacProcesses();
  } else {
    console.error(`OS "${os.platform()}" not supported`)
    process.exit(1)
  }

  console.log(processes)
}

init()