<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['name' => '', 'title' => '', 'details' => null]) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['name' => '', 'title' => '', 'details' => null]); ?>
<?php foreach (array_filter((['name' => '', 'title' => '', 'details' => null]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>
<header class="flex flex-wrap justify-between items-center gap-4 mb-3 @md:mb-6">
    <div class="flex-1 basis-0 flex-grow-[10000] max-w-full">
        <div class="flex overflow-hidden gap-2 items-start">
            <!--[if BLOCK]><![endif]--><?php if(isset($icon)): ?>
                <div class="[&>svg]:flex-shrink-0 [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-gray-400 [&>svg]:dark:stroke-gray-600">
                    <?php echo e($icon); ?>

                </div>
            <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
            <hgroup class="flex flex-wrap items-baseline gap-x-2 overflow-hidden">
                <h2 class="text-base font-bold text-gray-600 dark:text-gray-300 truncate" title="<?php echo e($title); ?>"><?php echo e($name); ?></h2>
                <!--[if BLOCK]><![endif]--><?php if($details): ?>
                    <p class="text-gray-400 dark:text-gray-600 font-medium truncate"><small class="text-xs"><?php echo e($details); ?></small></p>
                <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
            </hgroup>
        </div>
    </div>
    <!--[if BLOCK]><![endif]--><?php if($actions ?? false): ?>
        <div class="flex flex-grow">
            <div class="w-full flex items-center gap-4">
                <?php echo e($actions); ?>

            </div>
        </div>
    <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
</header>
<?php /**PATH /app/backend/vendor/laravel/pulse/src/../resources/views/components/card-header.blade.php ENDPATH**/ ?>