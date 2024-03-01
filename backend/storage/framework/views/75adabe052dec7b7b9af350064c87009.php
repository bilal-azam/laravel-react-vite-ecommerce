<?php extract(collect($attributes->getAttributes())->mapWithKeys(function ($value, $key) { return [Illuminate\Support\Str::camel(str_replace([':', '.'], ' ', $key)) => $value]; })->all(), EXTR_SKIP); ?>

<?php if (isset($component)) { $__componentOriginalfe9411472bfb5f0ad02390097d2c9c02 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalfe9411472bfb5f0ad02390097d2c9c02 = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'pulse::components.icons.cursor-arrow-rays','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('pulse::icons.cursor-arrow-rays'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(Illuminate\View\AnonymousComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>

<?php echo e($slot ?? ""); ?>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalfe9411472bfb5f0ad02390097d2c9c02)): ?>
<?php $attributes = $__attributesOriginalfe9411472bfb5f0ad02390097d2c9c02; ?>
<?php unset($__attributesOriginalfe9411472bfb5f0ad02390097d2c9c02); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalfe9411472bfb5f0ad02390097d2c9c02)): ?>
<?php $component = $__componentOriginalfe9411472bfb5f0ad02390097d2c9c02; ?>
<?php unset($__componentOriginalfe9411472bfb5f0ad02390097d2c9c02); ?>
<?php endif; ?><?php /**PATH /app/backend/storage/framework/views/68edaf3960e20431ad516bdfb0f4ba9e.blade.php ENDPATH**/ ?>