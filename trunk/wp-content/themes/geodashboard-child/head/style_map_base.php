<?php
/*

*/
?>
<style>
  
html,body,#mapid {
  width:100%;
  height:100%;
}

.sidebar{
  z-index:1000;
}

.sidebar .sidebar-wrapper {
  width: 400px; /*260px;*/
}

.sidebar:before, .off-canvas-sidebar:before {
  opacity: 1;
}
.sidebar::before, .off-canvas-sidebar::before {
  background-color: #ffffff;
}

#mapid {
  position: relative;
}

.pointer{
  cursor:pointer;
}

/* https://codepen.io/neoberg/pen/kavnF Loading ... */
.loading {
  position: absolute;
  z-index:1000;
  /*width:100%;*/
  top: 50%;
  width: 100%;
  /*left: 50%;*/
  /*
  margin: -60px 0 0 -60px;
  left: 50%;
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: 10px solid #19bee1;
  */
}

.WD-GUI-desktop{
  /**/
}

.WD-GUI-mobile{
  /**/
}

.WD-canvas{
  background-color:#fff;
}

.WD-canvas-hide{
  left:-30px;
  display:none;
}

.WD-GUI-visible{

}

.WD-GUI-hide{
  display:none;
}
 
.box-navigation{
  position:fixed;
  top:5px;
  right:5px;
  z-index:500;
  width:30px;
  margin-left:10px;
}

.box-gpsposition{
  position:fixed;
  bottom:25px;
  right:5px;
  z-index:500;
}

.box-gpsposition > button{
  display: inline-block;
  height: 56px;
  max-width: 56px;
  min-width: 56px;
  margin: auto;
  background-color: transparent;
  cursor: pointer;
  background-color: #fff;
  font-size: 12px;
  color: rgba(0,0,0,0.54);
  -moz-border-radius: 28px;
  -webkit-border-radius: 28px;
  border-radius: 28px;
  transition: height 0.3s,border-radius 0.3s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  border: 0;
  padding: 0;
  /*text-align: inherit;*/
  vertical-align: baseline;
  line-height: normal; /*contrast with b45*/
}

.btn-primary-map, .btn-primary-map:hover{
  background-color:rgba(255, 255, 255, 0.6);
  border: 0px solid rgb(0, 50, 160);
  /*color: rgb(0, 50, 160);*/
  padding: 4px 4px!important;
}


.btn-primary-map > span{
  font-size: 22px!important;
}

.btn-navigation{
  width:58px;
  padding: 10px!important;
  margin-bottom:5px;
  font-size:150%;
  background:none;
}

.box-searchbox-sm{
  position:fixed;
  top:0px;
  z-index:500;
  width:100%;
  height:64px;
  /*background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);*/
}

.box-input-address-search{
  margin: 8px;
}
#search-cointainer-sm{
  padding: 12px!important;
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 8px;
  display: flex;
}

.sandwich-menu{
  float: left;
}

.sandwich-menu > button{
  background: none;
  height: 64px;
  width: 64px;
  cursor: pointer;  
  margin: auto;
  display: inline-block;
  border: 0;
  padding: 0;
  vertical-align: baseline;
  font-size:170%;
}

.box-attribution-sm{
  width: 100%;
  text-align: center;
  bottom: 5px;
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  font-size: 10px;
}

</style>