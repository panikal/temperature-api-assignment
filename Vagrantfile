$provision_script = <<SCRIPT
# First we install latest puppet and other required deps
echo Now provisioning puppet and nodejs..
rpm -ivh http://yum.puppetlabs.com/puppetlabs-release-el-7.noarch.rpm
yum install -y puppet wget curl git

# We need to checkout from Git so install vcsrepo class for puppet
puppet module install puppetlabs/vcsrepo

# This installs the latest nodejs repo from Nodesource
# For reference, I'd never do something like this in production...
# CentOS does include a SCL for nodejs but its old and crusty...like CentOS7 at this point. :)
# But nodesource is trusted. What I DON'T trust is someone replacing the below script with
# something unsavoury in the future... :(
curl -sL https://rpm.nodesource.com/setup_11.x | bash -

# Install the nodejs/npm packages we'll need for later
yum install -y nodejs npm

SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "centos/7"
    config.vm.define "standalone" do |standalone|
        standalone.vm.hostname = "temp-test"
        standalone.vm.network "public_network"
    end
    config.vm.provider :virtualbox do |virtualbox, override|
        virtualbox.memory = 1024
        override.vm.box_download_checksum_type = "sha256"
        override.vm.box_download_checksum = "b24c912b136d2aa9b7b94fc2689b2001c8d04280cf25983123e45b6a52693fb3"
        override.vm.box_url = "https://cloud.centos.org/centos/7/vagrant/x86_64/images/CentOS-7-x86_64-Vagrant-1803_01.VirtualBox.box"
    end
    config.vm.provision "shell", inline: $provision_script
    config.vm.provision "puppet"
end
