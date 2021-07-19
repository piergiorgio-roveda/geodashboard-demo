<?php
/*

*/
?>
<style>
  
.note-xl{
  font-size:200%!important;
  display: inline!important;
  position: relative!important;
  bottom: -10px!important;
}


.ps-scrollbar-x-rail{
  display: none!important;
}
.ps-scrollbar-y-rail{
  display: none!important;
}

.modal-type1 {
  position:fixed;
  top:auto;
  right:auto;
  left:auto;
  bottom:0;
  width: calc(100% - 20px);
  margin: 10px 10px!important;
}

.modal-type1-tomap {
  left:260px;
  width: calc(100% - 280px);
}

.div-table-both{
  border-left:1px solid #b5b5b529;
  border-right:1px solid #b5b5b529;
}

.div-table-left{
  border-left:1px solid #b5b5b529;
}

.div-table-right{
  border-right:1px solid #b5b5b529;
}

.btn-esegui{
  font-size:50%!important;
  background-color:rgba(0,0,0,0)!important;
  box-shadow:none!important;
}
   
.btn-information {
  background-color: rgba(255, 255, 255, 0)!important;
  box-shadow: none!important;
  color: black!important;
  outline: none!important;
  border:0px;
  /*
  width:60px;
  height:60px;
  border-radius: 50%;
  */
  /*box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12)!important;*/
  width:100%;
}
   
.box-tile{

  /*
  float:left;
  padding-right:4px;
  margin-bottom: 5px;
  position: fixed;
  bottom: 35px;
  left: 5px;
  */
  width:100%;
  cursor:pointer;
}


.tile-thumb-label{
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight:900;
  text-shadow:
  1px 1px 0 #ffffffa3,
  -1px -1px 0 #ffffffa3,
  1px -1px 0 #ffffffa3,
  -1px 1px 0 #ffffffa3,
  1px 1px 0 #ffffffa3;
}
 
.list-choose-analisi02{
  background-color:white;
  color:black;
  font-weight:400;
}
.list-choose-analisi02-selected{
  background-color:#4362b5;
  color:white!important;
  font-weight:900;
}

.btn-link, .btn-link:focus, .btn-link:hover {
  border:0px;
  text-decoration:none;
  width:100%;
  color:#4362b5;
  font-weight: 700;
}

.ct-modal-title{
  background-color:#eee;
  border-color:#eee;
  border-style: solid;
  border-width: 1px;
  padding-top: 10px;
  padding-left: 10px;
}
.box-table{
  border-top:2px solid #eee;
}
   
.modal-footer{
  text-align:right;
}
.body-table-title{
  background-color:#eee;
  padding: 10px 10px 10px 10px;
}
.table-dataview{
  padding: 0px 10px 10px 10px;
}

.body-table-title > p{
  margin:0px;
}

.table-div{
  margin:0px!important;
  padding:0px!important;
}

.table-cell{
  padding-left:3px!important;
  padding-right:3px!important;
}

.table-cell-title1{
  margin-top:10px;
  margin-bottom:3px;
  font-size:16px;
  font-weight: 800;
}

.table-cell-title2{
  margin-top:10px;
  margin-bottom:3px;
  font-size:14px;
  font-weight: 800;
}
.table-row{
  border-color:#eee;
  border-style: solid;
  border-width: 0px 0px 1px 0px;
}
   
.list-group-item:first-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}

.list-group-item:last-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}

.badge-danger {
  background-color: #f44336;
}

.card-header{
  font-weight:600;
  color:white!important;
}
.span-link{
  cursor: pointer;
}

.fullscreenDiv {
  background-color: #eeeeeecc;
  width: 100%;
  height: auto;
  bottom: 0px;
  top: 0px;
  left: 0;
  position: absolute;
  z-index: 2000;
}
.msg-center{
  position: absolute;
  width: 100px;
  height: 50px;
  text-align:center;
  top: 50%;
  left: 50%;
  margin-left: -50px; /* margin is -0.5 * dimension */
  margin-top: -25px;
}

#locationField > .form-group {
  margin:0px;
}

.toc-text{
  font-size:20px;
  font-weight:700;
}

.toc-lyr {
  border-bottom: 0px solid;
}  

@keyframes rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.form-control::-moz-placeholder {
  color: #1859A7!important;
}
.form-control::-moz-placeholder {
  color: #1859A7!important;
}
.form-control:-ms-input-placeholder {
  color: #1859A7!important;
}
.form-control::-webkit-input-placeholder {
  color: #1859A7!important;
}
.form-control::placeholder{
  color: inherit;
}

.locationField-form-control::-moz-placeholder {
  font-size:13px!important;
}
.locationField-form-control::-moz-placeholder {
  font-size:13px!important;
}
.locationField-form-control:-ms-input-placeholder {
  font-size:13px!important;
}
.locationField-form-control::-webkit-input-placeholder {
  font-size:13px!important;
}
.locationField-form-control::placeholder{
  font-size:13px!important;
}
   
.btn-serie{
  background-color: white;
}
.btn-serie-current{
  border: 1px solid rgb(0, 50, 160);
  color: rgb(0, 50, 160);
}
.btn-serie-other {
  border: 1px solid rgb(192, 192, 192);
  color: rgb(192, 192, 192);
}

.btn-serie-tool {
  border: 1px solid rgb(0, 50, 160);
  color: rgb(255, 0, 0);
}

.btn-serie:hover{
  background-color: white;
  color: rgb(0, 50, 160);
}

.modal01-content{
  z-index:2100;
  border-radius:0px;
}

.btn-confirm-position{
  position:fixed;
  bottom:10px;
  z-index:5000;
}

.label-radio{
  color:black;
  margin-left:18px;
  padding-top:1px;
  font-size: 14px;
}

.form-control{
  padding:0px;
  width: 100%!important;
}
  
.status-gps{
  position:fixed;
  top:10px;
  right:10px;
  z-index:1000;
  font-size:12px;
  color:red;
}
   
.control-label{
  margin: 5px 0 0 0!important;
}
   
.btn-restart{
  position:fixed;
  top:10px;
  left:10px;
  z-index:1000;
  font-size:12px;
}

.mycluster_civlabel {
  text-align:right;
  width: 30px;
  height:99px;
  font-weight: 900;
  background-repeat: no-repeat;
  background-position: center center;
  white-space: nowrap;
}
.mycluster_civlabel > span{
  color:#ea2d00;
  font-size:14px;
  font-weight: 900;
  text-shadow:1px 1px 0 #ffffffa3,-1px -1px 0 #ffffffa3,1px -1px 0 #ffffffa3,-1px 1px 0 #ffffffa3,1px 1px 0 #ffffffa3;
  padding:0px;
  padding-left:0px;
  padding-right:0px; 
  border-radius:0px;
}

.form-control-sm{
  height: 25px!important;
}

.simple_loadingString{
  margin-top: 15px;
  font-size: 140%;
  color: #8b8b8b;
  font-style: italic;
}

.form-control-sm:focus {
  color: #000;
  background-color: #fff;
  border: 0px;
  outline: 0;
      box-shadow: 0 0 0 0 rgba(0,0,0);
}
</style>