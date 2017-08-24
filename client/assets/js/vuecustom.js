//footer组件
Vue.component("custom-footer",{
	data:function(){
		return {
			showfotlink:true
		};
	},
	props:["btn"],
	template:`<div class="footer">
				<div class="footer-nav" v-show="showfotlink">
				  <ul class="l-row">
					<li><a href="#">关于楼脉动</a></li>
					<li><a href="#">网站地图</a></li>
					<li><a href="#">联系我们</a></li>
				  </ul>
				</div>
				<div class="l-row">
				  <div class="footer-user">
			          自定义内容
				  </div>
				</div>
			</div>`
});


//select选项
Vue.component("custom-select",{
	props:["phValue","list"],
	data:function(){
		return {
			selectShow:false,
			val:this.phValue
		};

	},
	template:`<div class="select-box" v-on:click.stop  :class="{'act':selectShow}">
               <div class="placeholder" @click="selectShow = !selectShow">{{val}}</div>
               <custom-drop-list
	               :list="list" 
	               :selectShow = selectShow
	               v-on:receive="changeValueHandle"
               ></custom-drop-list>
           </div>`,
    methods:{
    	changeValueHandle(value,selectShow){
    		this.val = value;
    		this.selectShow = false;
    	},
    }
})
//select-list选项
Vue.component("custom-drop-list",{
	props:["list","selectShow"],
	template:`<ul class="drop-down">
                 <li class="option" 
                 	v-for="(item,index) of list"
                 	:datains="index" 
                 	@click="selectValueHandle(item,selectShow,index)"
                 	>{{item}}
                 </li>
               </ul>`,
    methods:{
    	selectValueHandle:function(item,selectShow,index){
            this.$emit("receive",item,selectShow,index);
            this.$emit("receivenum",index);

    	}
    }

});

