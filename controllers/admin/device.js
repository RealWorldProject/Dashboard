const Device = require("../../models/Deviceadmin");

exports.getDevicePage = (req, res) => {
  res.render("../views/admin/device");
}

exports.postAddDevice = async (req, res) => {
  const { name, macaddress } = req.body;
  let active = req.body.active == "Active" ? true : false;
  const data = {
    name,
    macaddress,
    active,
  };


  const device = new Device({ name, macaddress, active });
  try {
    await device.save();
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).json(data);
  console.log(data);
  console.log("add test");
};

exports.getAllDevice = async (req, res) => {
  const name = req.params.name;
  const device = await Device.find()
    .sort({ name: 1 })
    
  res.status(200).json(device);
};




exports.deleteDevice = async (req, res ) => {
  const deviceID = req.params.deviceID;
  console.log(deviceID);
  const device = await Device.findByIdAndDelete(deviceID);
  res.status(200).json({ status: true });
};

exports.postUpdateDevice = async (req, res, ) => {
  const name = req.body.name;
  const macaddress = req.body.macaddress;
  let active = req.body.active == "Active" ? true : false;
  const data = {
    name,
    macaddress,
    active,
  };

  const device = await Device.findById(deviceID);
  device.name = name;
  device.macaddress = macaddress;
  device.active = active;

  try {
    await device.save();
  } catch (err) {
    console.log(err.message);
  }
  res.status(200).json(data);
};
