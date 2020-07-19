module.exports = {
  arr_maps: function (map_config, args) {
    const found_category = valid_args(map_config).category.some(r=> args.indexOf(r) >= 0);
    const found_tag = valid_args(map_config).tag.some(r=> args.indexOf(r) >= 0);
  
    console.log(found_category, found_tag);
  
    return type_args(map_config, args, found_category, found_tag, valid_args(map_config).data);
  },
  randomMap: function (game, args) {
    var tmp = [];
    
    module.exports.arr_maps(game, args).forEach(arg => {
      arg.map.forEach(el => {
        tmp.push(el);
      });
    });
  
    return tmp[Math.floor(Math.random() * tmp.length)];
  }
};

function valid_args(map_config) {
  args_valid = { 'data': [], 'category': [], 'tag': [] };

  valid_args_category = [];

  valid_args_tag = [];
  valid_args_tag_tmp = [];

  map_config.forEach(c => {
    //data
    args_valid.data.push(c);

    //args
    valid_args_category.push(c.category);
    c.map.forEach(t => {
      valid_args_tag_tmp.push(t.tag);
    });

  });
  
  tag_tmp = [];

  valid_args_tag_tmp.forEach(arr_tag => {
    arr_tag.forEach(tag => {
      tag_tmp.push(tag);
    });
  });

  args_valid.category = valid_args_category;
  args_valid.tag = tag_tmp.filter( onlyUnique );

  return args_valid;
}

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}

function type_args(map_config, args, arg1, arg2, data) {

  if (arg1 == false && arg2 == false && args.length == 0) {
    all = [];
    
    data.forEach(el => {
      all.push(el);
    });

    return all;
  } else if (arg1 == true && arg2 == false) {
    all = [];
    
    data.forEach(el => {
      all.push(el);
    });

    return all;
  } else if (arg1 == false && arg2 == true) {
    tag = [];

    data.forEach(el => {
      format = { 'category': '', 'map': [] };

      el.map.forEach(map => {
        map.tag.forEach(element => {

          if (args == element) {
            format.category = el.category;
            format.map.push(map);
          }

        });
      });

      if (format.category == '') {
        delete format;
      }

      if (typeof format != "undefined") {
        tag.push(format);
      }
      
    });

    return tag;

  } else if (arg1 == true && arg2 == true) {
    console.log("arg: category + tag");

    category_tag = [];

    // TO DO

    return category_tag;

  } else {
    valid_arguments = valid_args(map_config).category + ',' + valid_args(map_config).tag;
    meaning = '[s, m, b] = [small, meddiam, big], [f, c] = [fun, competitive]';
    return [{ 'category': 'invalid argument', 'map': [{ 'name': 'valid arguments:\n', 'code': valid_arguments + '\n' + meaning }] }];
  }

}