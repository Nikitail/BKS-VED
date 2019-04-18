import Vue from 'vue';
import UIkit from 'uikit';
import axios from 'axios';

UIkit.util.ready(function () {
    UIkit.util.removeClass(UIkit.util.$('body'), 'uk-invisible');
});

import MaskedInput from 'vue-text-mask';

Vue.component('masked-input', MaskedInput);

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, {
    events: 'change'
});

UIkit.modal.labels = {
    ok: 'OK',
    cancel: 'Отмена'
};

new Vue({
    el: '#form',
    data: {
        form: {
            fio: '',
            phone: '',
            email: '',
            ogrn: ''
        },
        loading: false,
        sended: false
    },
    methods: {
        onSubmit() {
            this.$validator.validate().then(result => {
                if (result) {
					dataLayer.push({
						'event':'Form',
							'eventCategory':'ved_testdrive',
							'eventAction':'Registration-form', 
							'eventLabel':'Submit'     
					});
                    this.loading = true;
                    axios.post('/form.php', this.form)
                        .then(response => {
                            this.sended = true;
                            this.loading = false;
                            UIkit.modal.alert('<p class="uk-text-large uk-text-center">Спасибо за заявку!<br>Мы позвоним вам в течение часа.</p>');
							dataLayer.push({
								'event':'Lead',
									'eventCategory':'ved_testdrive',
									'eventAction':'Registration-form', 
									'eventLabel':'Success'     
							});

                        })
                        .catch(error => {
                            this.loading = false;
                        });
                }
            });
        },
		clickRequest(){
				dataLayer.push({
				'event':'Request',
					'eventCategory':'ved_testdrive', 
					'eventAction':'Request', 
					'eventLabel':'Click'     
				});

		},
		call(){
			dataLayer.push({
				'event':'Call',
					'eventCategory':'ved_testdrive',
					'eventAction':'Phone-call', 
					'eventLabel':'Click'     
			});
		}
		
    }
});