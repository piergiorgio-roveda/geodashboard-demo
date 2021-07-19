<?php
function acf_local_field_group_v1_requirements(){

  $return=array();
  $error=0;

	$return['add_action'][]='acf/init';

  // ---

  // ---

	if (!class_exists('ACF')) {
	  //  The ACF class doesn't exist, so you can probably redefine your functions here
		$error++;
		$return['my_plugin']['ACF']['exist']=false;
    $return['status']='ko';
    $return['error']=$error;
    return $return;
	}
	else{
		$return['my_plugin']['ACF']['exist']=true;
	}

  // ---
  if($error==0){
    $return['status']='ok';
  }
  else{
    $return['status']='ko';
  }
  $return['error']=$error;
  return $return;
}


add_action('acf/init', 'my_acf_add_local_field_groups');
// DEPRECATED
//add_action('acf/init', 'my_acf_add_custom');

function my_acf_add_local_field_groups() {

	acf_add_local_field_group(array(
		'key' => 'group_5ba0cc704efd8',
		'title' => 'user.role',
		'fields' => array(
			array(
				'key' => 'field_5a589dedc1956',
				'label' => 'ERP User Roles',
				'name' => 'user_roles',
				'type' => 'checkbox',
				'instructions' => '​',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'premium' => 'Premium',
					'advanced' => 'Advanced',
				),
				'allow_custom' => 0,
				'default_value' => array(
				),
				'layout' => 'horizontal',
				'toggle' => 0,
				'return_format' => 'value',
				'save_custom' => 0,
			),
			array(
				'key' => 'field_5d5bbb2c05e5a',
				'label' => 'Black list attiva',
				'name' => 'black_list_attiva',
				'type' => 'true_false',
				'instructions' => 'Segnare col flag se l\'utente deve essere monitorato - influisce sulle prestazioni della navigazione',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '',
				'default_value' => 0,
				'ui' => 0,
				'ui_on_text' => '',
				'ui_off_text' => '',
			),
			array(
				'key' => 'field_5d5bbb2c05e5z',
				'label' => 'Utente (black) disabilitato',
				'name' => 'black_user_disable',
				'type' => 'true_false',
				'instructions' => 'Segnare col flag se l\'utente deve essere bloccato - apparirà un messaggio ad ogni accesso',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'message' => '',
				'default_value' => 0,
				'ui' => 0,
				'ui_on_text' => '',
				'ui_off_text' => '',
			),
			array(
				'key' => 'field_5af59c419993b',
				'label' => 'user-default-password',
				'name' => 'user-default-password',
				'type' => 'text',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
			array(
				'key' => 'field_5bb221d27849a',
				'label' => 'scadenza_licenza',
				'name' => 'scadenza_licenza',
				'type' => 'date_picker',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'display_format' => 'd/m/Y',
				'return_format' => 'Ymd',
				'first_day' => 1,
			),
			array(
				'key' => 'field_5bfed868927dc',
				'label' => 'enable_admin_dashboard',
				'name' => 'enable_admin_dashboard',
				'type' => 'radio',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					0 => 'No',
					1 => 'Sì',
				),
				'allow_null' => 0,
				'other_choice' => 0,
				'default_value' => 0,
				'layout' => 'horizontal',
				'return_format' => 'value',
				'save_other_choice' => 0,
			),
			array(
				'key' => 'field_5bfed8bc927dd',
				'label' => 'enable_console_log',
				'name' => 'enable_console_log',
				'type' => 'radio',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					0 => 'No',
					1 => 'Sì',
				),
				'allow_null' => 0,
				'other_choice' => 0,
				'default_value' => 0,
				'layout' => 'horizontal',
				'return_format' => 'value',
				'save_other_choice' => 0,
			),
			array(
				'key' => 'field_5bfed8dc927de',
				'label' => 'enable_admin_dashboard_standard',
				'name' => 'enable_admin_dashboard_standard',
				'type' => 'radio',
				'instructions' => '',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					0 => 'No',
					1 => 'Sì',
				),
				'allow_null' => 0,
				'other_choice' => 0,
				'default_value' => 0,
				'layout' => 'horizontal',
				'return_format' => 'value',
				'save_other_choice' => 0,
			),
			array(
				'key' => 'field_5c09063b802af',
				'label' => 'scadenze_passate',
				'name' => 'scadenze_passate',
				'type' => 'text',
				'instructions' => 'elencare le date passate separate da |',
				'required' => 0,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'maxlength' => '',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'user_form',
					'operator' => '==',
					'value' => 'edit',
				),
				array(
					'param' => 'user_role',
					'operator' => '==',
					'value' => 'all',
				),
				array(
					'param' => 'current_user_role',
					'operator' => '==',
					'value' => 'administrator',
				),
			),
		),
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => 1,
		'description' => '',
	));
}
