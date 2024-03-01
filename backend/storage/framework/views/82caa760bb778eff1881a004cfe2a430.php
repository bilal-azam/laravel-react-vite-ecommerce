<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['user' => null, 'name' => null, 'extra' => null, 'avatar' => null, 'stats' => null]) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['user' => null, 'name' => null, 'extra' => null, 'avatar' => null, 'stats' => null]); ?>
<?php foreach (array_filter((['user' => null, 'name' => null, 'extra' => null, 'avatar' => null, 'stats' => null]), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>

<div <?php echo e($attributes->merge(['class' => 'flex items-center justify-between p-3 gap-3 bg-gray-50 dark:bg-gray-800/50 rounded'])); ?>>
    <div class="flex items-center gap-3 overflow-hidden">
        <!--[if BLOCK]><![endif]--><?php if(isset($avatar)): ?>
            <?php echo e($avatar); ?>

        <?php elseif($user->avatar ?? false): ?>
            <img src="<?php echo e($user->avatar); ?>" alt="<?php echo e($user->name); ?>" loading="lazy" class="rounded-full w-8 h-8 object-cover">
        <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->

        <div class="overflow-hidden">
            <div class="text-sm text-gray-900 dark:text-gray-100 font-medium truncate" title="<?php echo e($user->name ?? $name); ?>">
                <?php echo e($user->name ?? $name); ?>

            </div>

            <div class="text-xs text-gray-500 dark:text-gray-400 truncate" title="<?php echo e($user->name ?? $extra); ?>">
                <?php echo e($user->extra ?? $extra); ?>

            </div>
        </div>
    </div>

    <!--[if BLOCK]><![endif]--><?php if(isset($stats)): ?>
        <div class="text-xl text-gray-900 dark:text-gray-100 font-bold tabular-nums">
            <?php echo e($stats); ?>

        </div>
    <?php endif; ?> <!--[if ENDBLOCK]><![endif]-->
</div>
<?php /**PATH /app/backend/vendor/laravel/pulse/src/../resources/views/components/user-card.blade.php ENDPATH**/ ?>