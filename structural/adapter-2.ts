interface Windows {
  runWindowsProgram(name: string): void
}

interface Linux {
  runLinuxProgram(name: string): void
}

class Win10 implements Windows {
  runWindowsProgram(name: string): void {
    console.log(`Running ${name} on Windows 10`)
  }
}

class Ubuntu implements Linux {
  runLinuxProgram(name: String): void {
    console.log(`Running ${name} on Ubuntu`)
  }
}

class WindowsAdapter implements Linux {
  private windows: Windows

  constructor(_windows: Windows) {
    this.windows = _windows
  }

  runLinuxProgram(name: string): void {
    this.windows.runWindowsProgram(`Linux Program '${name}'`)
  }
}

class LinuxAdapter implements Windows {
  private linux: Linux

  constructor(_linux: Linux) {
    this.linux = _linux
  }

  runWindowsProgram(name: string): void {
    this.linux.runLinuxProgram(`Windows Program '${name}'`)
  }
}

class AdapterExample {
  windows: Windows
  linux: Linux

  constructor() {
    this.windows = new Win10()
    this.linux = new Ubuntu()

    this.run()
  }

  private run() {
    const windowsAdapter = new WindowsAdapter(this.windows)
    const linuxAdapter = new LinuxAdapter(this.linux)

    this.windows.runWindowsProgram('freecell')
    windowsAdapter.runLinuxProgram('gparted')

    this.linux.runLinuxProgram('gparted')
    linuxAdapter.runWindowsProgram('freecell')
  }
}

new AdapterExample()
