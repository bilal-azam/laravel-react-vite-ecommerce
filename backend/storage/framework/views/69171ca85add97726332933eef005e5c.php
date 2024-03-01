<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['label', 'options']) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['label', 'options']); ?>
<?php foreach (array_filter((['label', 'options']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>
<div <?php echo e($attributes->only('class')->merge(['class' => 'flex border border-gray-200 dark:border-gray-700 overflow-hidden rounded-md focus-within:ring'])); ?>>
    <label class="px-3 flex items-center border-r border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap bg-gray-100 dark:bg-gray-800/50"><?php echo e($label); ?></label>
    <select
        <?php echo e($attributes->except('class')); ?>

        class="overflow-ellipsis w-full border-0 pl-3 pr-8 py-1 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm shadow-none focus:ring-0"
    >
        <!--[if BLOCK]><![endif]--><?php $__currentLoopData = $options; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $value => $label): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <option value="<?php echo e($value); ?>"><?php echo e($label); ?></option>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?> <!--[if ENDBLOCK]><![endif]-->
    </select>
</div>
<?php /**PATH /app/backend/vendor/laravel/pulse/src/../resources/views/components/select.blade.php ENDPATH**/ ?>