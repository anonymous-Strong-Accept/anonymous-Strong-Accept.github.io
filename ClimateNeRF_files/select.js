var currentSimList = ["crf_15", "crf_25", "crf_35"];
var currentSim = "crf_15";
var currentSceneList = ['calendar','city',"foliage",'walk', "000", "011","015", "020"];
var currentScene = "000";
var currentDataset = "reds4";
var currentDatasetList = ["reds4", "vid4"];
var currentDatasetId = 0;

function ChangeSim(idx) {
    // 获取CRF选择列表元素
    var li_list = document.getElementById("sim-view-ul").children;
    // 更新当前选中的CRF值
    currentSim = currentSimList[idx];

    // 遍历所有CRF选项，重置它们的类名
    for (var i = 0; i < li_list.length; i++) {
        li_list[i].className = "";
    }

    // 为当前选中的CRF设置添加'active'类名
    li_list[idx].className = "active";

    // 更新simulation_video元素的src属性以指向新的视频文件
    var video = document.getElementById("simulation_video");
    video.src = "ECOVSR_files/ours/" + currentSim + '/' + currentScene + '.mp4';

    // 使用setTimeout为视频加载添加一个简单的淡入效果
    var container = video.parentNode;
    container.style.opacity = 0; // 首先将透明度设置为0
    setTimeout(() => {
        container.style.opacity = 1; // 一段时间后将透明度设置为1
        video.load(); // 确保调用load方法加载新的视频文件
    }, 500); // 这里的1000是延迟时间（1秒）
}

function ChangeScene(idx) {
    var li_list = document.getElementById("scene-view-ul").children;

    for (var i = 0; i < li_list.length; i++) {
        li_list[i].className = "";
    }
    li_list[idx].className = "active";

    // 注意这里需要更新 currentScene 变量以匹配当前数据集的场景列表
    currentScene = currentDataset === "vid4" ? ["calendar", "city", "foliage", "walk"][idx] : ["000", "011", "015", "020"][idx];

    let video = document.getElementById("simulation_video");
    video.src = "ECOVSR_files/ours/" + currentSim + '/' + currentScene + '.mp4';

    let container = video.parentNode;
    container.style.opacity = 0;
    setTimeout(() => {
        container.style = "width: 100%; opacity: 1;";
        video.load();
    }, 500);
}

function ChangeDataset(idx) {
    var li_list = document.getElementById("dataset-view-ul").children;
    for (var i = 0; i < li_list.length; i++) {
        li_list[i].className = "";
    }
    li_list[idx].className = "active";

    currentDataset = currentDatasetList[idx];
    currentDatasetId = idx;

    // 根据所选的数据集更新场景列表并选择第一个场景作为默认场景
    UpdateSceneList(currentDataset);
    ChangeScene(0); // 将场景切换到更新后列表的第一个场景
}

function UpdateSceneList(dataset) {
    var ul = document.getElementById("scene-view-ul");
    if (!ul) {
        console.error("Scene list UL not found");
        return;
    }
    // 根据所选的数据集更新场景列表
    var scenes = dataset === "reds4" ? ["000", "011", "015", "020"] : ["Calendar", "City", "Foliage", "Walk"];
    
    // 清空当前的 scene 列表
    ul.innerHTML = '';

    // 为当前 dataset 的每个 scene 创建一个新的 li 元素并添加到 ul 中
    scenes.forEach(function(scene, index) {
        var li = document.createElement('li');
        li.setAttribute('role', 'presentation');

        var a = document.createElement('a');
        a.setAttribute('href', 'javascript: void(0);');
        a.innerText = scene;
        // 确保点击时传递正确的索引
        a.onclick = function() { ChangeScene(index); };

        li.appendChild(a);
        ul.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", function() {
    UpdateSceneList(currentDataset);
});