var obj = {
  name: '彭湖湾',
  job: '学生'
}
var copyObj = Object.assign({}, obj);
copyObj.name = '我才不叫彭湖湾呢！ 哼  (。・`ω´・)';
console.log(obj);   // {name: "彭湖湾", job: "学生"}
console.log(copyObj);  // {name: "我才不叫彭湖湾呢！ 哼  (。・`ω´・)", job: "学生"}
