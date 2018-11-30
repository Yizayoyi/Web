
var allowDrop = function (e) {
	e.preventDefault();
}

var fromE = 0;
var toE = 0;

var drag = function (e) {
	fromE = $(e.path[1]).attr("data-index");
}

var drop = function (e) {
	toE = e.target.dataset.index;
	if (toE == undefined) {
		toE = $(e.path[1]).attr("data-index");
	}
	if (fromE != toE) {
		if (data[fromE].leave > 0) {
			if (data[fromE].leave == data[toE].leave) {
				if (data[toE].leave == max_leave) {
					layer.msg("已到达最高等级", { icon: 6 });
				} else {
					data[fromE].leave = 0;
					data[toE].leave += 1;
					var temp_leave = data[toE].leave;
					if (temp_leave > leave_num) {
						leave_num = temp_leave;
						leave = shops[leave_num - 1].name;
						if (leave_num - allow_buy > 0) {
							shops[leave_num - allow_buy].buy = 1;
						}
					}
				}
			} else {
				var temp = data[fromE].leave;
				data[fromE].leave = data[toE].leave;
				data[toE].leave = temp;
			}
			setData();
		}
	}
}

