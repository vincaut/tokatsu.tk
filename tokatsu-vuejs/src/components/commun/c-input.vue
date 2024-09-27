<template>
    <input :type="type" :id="`input-${inputId}`" v-model="value" :placeholder="$t(placeholder)" :disabled="disabled"
        :class="{ changed: colorModifications && !disallowColorModifications, invalid: invalidClass, disabled: disabled }" />
</template>

<script lang="ts">
import { random } from 'lodash';

export default {
    name: 'cInput',
    props: {
        label: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text',
            validator: (value: string) => {
                return ['text', 'email', 'tel', 'password'].includes(value);
            }
        },
        placeholder: {
            type: String,
            default: ''
        },
        maxLenght: {
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false
        },
        disallowColorModifications: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            inputId: random(0, 10000000000000000),
            value: this.modelValue,
            defaultValue: this.modelValue,
            errorMessages: [] as string[],
            invalidClass: false,
            initialCheck: true,
            pattern: '',
            colorModifications: false
        };
    },
    mounted() {
        if (this.type === 'email') {
            const r: RegExp = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:)\])$/;
            this.pattern = r.toString().slice(1, -1);
        } else if (this.type === 'tel') {
            this.pattern = '^0[0-9]{9}$';
        } else {
            this.pattern = '.*';
        }

        this.defaultValue = this.value;

        this.checkValid();
    },
    methods: {
        checkValid(force: boolean = false): boolean {
            let isvalid = true;
            this.invalidClass = false;
            this.errorMessages = [];
            const value = this.value.trim();
            if(force) this.initialCheck = false;

            // Required
            if (this.required && (value === '' || value === null)) {
                isvalid = false;
                if (!this.initialCheck) {
                    this.invalidClass = true;
                    this.errorMessages.push(this.$t('input.error.required'));
                }
            }

            // Pattern
            const r: RegExp = new RegExp(this.pattern);
            if (!r.test(value) && value !== '' && value !== null && value !== undefined) {
                isvalid = false;
                this.invalidClass = true;
                switch (this.type) {
                case 'email':
                    this.errorMessages.push(this.$t('input.error.pattern.email'));
                    break;
                case 'tel':
                    this.errorMessages.push(this.$t('input.error.pattern.tel'));
                    break;
                default:
                    this.errorMessages.push(this.$t('input.error.pattern.default'));
                    break;
                }
            }

            // Max lenght
            if (this.maxLenght && value.length > this.maxLenght) {
                isvalid = false;
                this.invalidClass = true;
                this.errorMessages.push(this.$t('input.error.maxLenght', { max: this.maxLenght }).toString());
            }

            this.initialCheck = false;

            return isvalid;
        },
        resetInput() {
            this.invalidClass = false;
            this.errorMessages = [];
            this.initialCheck = true;
            this.defaultValue = this.modelValue;
            this.$nextTick(() => {
                this.colorModifications = false;
            });
        },
        checkChange(): boolean {
            return this.value !== this.defaultValue;
        }
    },
    watch: {
        modelValue(value: string) {
            this.value = value;
        },
        value() {
            this.checkValid();

            if (this.value !== this.defaultValue) this.colorModifications = true;
            else this.colorModifications = false;

            this.$emit('update:modelValue', this.value);
        }
    }
};
</script>

<style scoped>

</style>