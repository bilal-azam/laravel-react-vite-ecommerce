<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['numeric' => false]) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['numeric' => false]); ?>
<?php foreach (array_filter((['numeric' => false]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>
<td <?php echo e($attributes->merge(['class' => 'first:rounded-l-md last:rounded-r-md text-sm bg-gray-50 dark:bg-gray-800/50 first:pl-3 last:pr-3 px-1 @sm:px-3 py-3' . ($numeric ? ' text-right tabular-nums whitespace-nowrap' : '')])); ?>>
    <?php echo e($slot); ?>

</td>
<?php /**PATH /app/backend/vendor/laravel/pulse/src/../resources/views/components/td.blade.php ENDPATH**/ ?>