
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
  config.vm.define "standalone" do |standalone|
    standalone.vm.hostname = "temp-test"
    standalone.vm.network "public_network"
  end
end
