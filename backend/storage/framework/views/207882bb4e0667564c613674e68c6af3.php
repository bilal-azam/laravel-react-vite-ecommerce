<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['cols' => 6, 'rows' => 1]) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['cols' => 6, 'rows' => 1]); ?>
<?php foreach (array_filter((['cols' => 6, 'rows' => 1]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>
<section
    <?php echo e($attributes->merge(['class' => "@container flex flex-col p-3 sm:p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm ring-1 ring-gray-900/5 default:col-span-full default:lg:col-span-{$cols} default:row-span-{$rows}"])); ?>

    x-data="{
        loading: false,
        init() {
            <?php if(isset($_instance)): ?>
                Livewire.hook('commit', ({ component, succeed }) => {
                    if (component.id === $wire.__instance.id) {
                        succeed(() => this.loading = false)
                    }
                })
            <?php endif; ?>
        }
    }"
>
    <?php echo e($slot); ?>

</section>
<?php /**PATH /app/backend/vendor/laravel/pulse/src/../resources/views/components/card.blade.php ENDPATH**/ ?>