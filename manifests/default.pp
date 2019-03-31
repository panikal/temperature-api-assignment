
  # create a directory
  file { '/opt/temperature-app':
      ensure   => 'directory',
      before   => Vcsrepo['/opt/temperature-app']
  }
  # clone the repo
  vcsrepo { '/opt/temperature-app': 
      ensure   => present,
      provider => git,
      source   => 'https://github.com/panikal/temperature-api-assignment.git',
      before   => Exec['install node modules']
  }
  # install modules
  exec { 'install node modules' :
      command  => '/usr/bin/npm install',
      cwd      => '/opt/temperature-app',
      before   => Exec['start node']
  }
  # start the app
  exec { 'start node': 
      command  => '/usr/bin/npm start &',
      cwd      => '/opt/temperature-app',
  }
