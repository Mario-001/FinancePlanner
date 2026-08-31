<script setup>
const stats = [
  { value: '10K+', label: 'Active Users' },
  { value: '$2M+', label: 'Money Tracked' },
  { value: '4.9★', label: 'User Rating' },
]

const whyCards = [
  {
    title: 'Track Everything',
    desc: 'Effortlessly track your income and expenses with smart categorization. See your balance update in real-time and never lose sight of your spending.',
    from: 'from-blue-600',
    to: 'to-blue-500',
    icon: 'trend',
  },
  {
    title: 'Understand Your Habits',
    desc: "Beautiful charts and insights show exactly where your money goes. Make smarter decisions with data that's easy to understand.",
    from: 'from-purple-600',
    to: 'to-purple-500',
    icon: 'pie',
  },
  {
    title: 'Reach Your Goals',
    desc: 'Set savings goals for things you care about. Track your progress and celebrate as you hit each milestone on your journey.',
    from: 'from-emerald-600',
    to: 'to-green-500',
    icon: 'target',
  },
]

const steps = [
  {
    title: 'Create Your Account',
    desc: 'Sign up for free in seconds. No credit card required.',
  },
  {
    title: 'Add Transactions',
    desc: 'Start tracking your income and expenses with simple forms.',
  },
  {
    title: 'Watch Your Progress',
    desc: 'Get insights, set goals, and improve your financial health.',
  },
]

const testimonials = [
  {
    quote: "This app completely changed how I manage my student budget. I finally know where my money goes!",
    name: 'Sarah Johnson',
    role: 'College Student',
    from: 'from-indigo-400',
    to: 'to-purple-400',
  },
  {
    quote:
      'The savings goals feature helped me save $3,000 for my laptop in just 6 months. Highly recommend!',
    name: 'Michael Chen',
    role: 'Graduate Student',
    from: 'from-teal-400',
    to: 'to-emerald-500',
  },
  {
    quote:
      'Simple, intuitive, and exactly what I needed. The budget alerts keep me on track every month.',
    name: 'Emma Davis',
    role: 'Young Professional',
    from: 'from-fuchsia-400',
    to: 'to-pink-500',
  },
]

const plans = [
  {
    name: 'Free',
    tagline: 'Perfect for getting started',
    price: '$0',
    period: 'month',
    highlight: false,
    features: ['Unlimited transactions', 'Basic analytics', 'Up to 3 savings goals', 'Monthly budget tracking'],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    tagline: 'For serious savers',
    price: '$4.99',
    period: 'month',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Everything in Free',
      'Advanced analytics',
      'Unlimited savings goals',
      'Recurring transactions',
      'Priority support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Premium',
    tagline: 'For power users',
    price: '$9.99',
    period: 'month',
    highlight: false,
    features: ['Everything in Pro', 'AI-powered insights', 'Investment tracking', 'Custom categories', 'API access'],
    cta: 'Get Started',
  },
]

const footerColumns = [
  {
    title: 'Features',
    links: ['Dashboard', 'Analytics', 'Budget Planning', 'Savings Goals', 'Export Data'],
  },
  {
    title: 'Resources',
    links: ['Help Center', 'Financial Tips', 'Blog', 'Community', 'API Docs'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'],
  },
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <header class="border-b border-slate-100">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <RouterLink to="/" class="flex items-center gap-2">
          <span
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="font-display text-lg font-bold text-blue-600">FinanceTracker</span>
        </RouterLink>

        <nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" class="hover:text-slate-900">Features</a>
          <a href="#how-it-works" class="hover:text-slate-900">How It Works</a>
          <a href="#testimonials" class="hover:text-slate-900">Testimonials</a>
          <a href="#pricing" class="hover:text-slate-900">Pricing</a>
        </nav>

        <div class="flex items-center gap-2">
          <RouterLink
            to="/login"
            class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            Log In
          </RouterLink>
          <RouterLink
            to="/register"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Sign Up Free
          </RouterLink>
        </div>
      </div>
    </header>

    <section class="bg-gradient-to-b from-blue-50/60 to-white px-4 py-16 text-center sm:px-6 sm:py-24">
      <div class="mx-auto max-w-2xl">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700"
        >
          🔔 Now with Budget Alerts &amp; Savings Goals! 🎉
        </span>

        <h1 class="font-display mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Take Control of Your
          <span class="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>

        <p class="mt-6 text-lg text-slate-600">
          The smart finance tracker designed for students and young professionals. Track expenses, set
          goals, and build better money habits - all in one place.
        </p>

        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-500"
          >
            Get Started Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </RouterLink>
          <a
            href="#how-it-works"
            class="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            See How It Works
          </a>
        </div>

        <div class="mt-14 grid grid-cols-3 gap-4">
          <div v-for="s in stats" :key="s.label">
            <p class="font-display text-2xl font-bold text-blue-600 sm:text-3xl">{{ s.value }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 class="font-display text-center text-3xl font-bold text-slate-900 sm:text-4xl">
        Why Students Love FinanceTracker
      </h2>
      <p class="mx-auto mt-3 max-w-md text-center text-slate-500">
        Simple tools designed specifically for your financial journey
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <div
          v-for="card in whyCards"
          :key="card.title"
          class="rounded-2xl bg-gradient-to-br p-8 text-white shadow-sm"
          :class="[card.from, card.to]"
        >
          <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <svg
              v-if="card.icon === 'trend'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="h-7 w-7"
            >
              <path d="M3 17l6-6 4 4 8-8M15 7h6v6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg
              v-else-if="card.icon === 'pie'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              class="h-7 w-7"
            >
              <path d="M21.2 15a9 9 0 1 1-9.2-9v9Z" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13 3.1V12h8.9" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="h-7 w-7">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </span>

          <h3 class="font-display mt-6 text-2xl font-bold">{{ card.title }}</h3>
          <p class="mt-3 text-sm text-white/90">{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="bg-slate-50 px-4 py-16 sm:px-6">
      <div class="mx-auto max-w-6xl text-center">
        <h2 class="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Start Managing Money in 3 Simple Steps
        </h2>
        <p class="mx-auto mt-3 max-w-md text-slate-500">
          Get started in minutes and take control of your finances today
        </p>

        <div class="mt-14 grid gap-10 sm:grid-cols-3">
          <div v-for="(step, i) in steps" :key="step.title">
            <span
              class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 font-display text-xl font-bold text-white"
            >
              {{ i + 1 }}
            </span>
            <h3 class="font-display mt-4 text-lg font-bold text-slate-900">{{ step.title }}</h3>
            <p class="mx-auto mt-2 max-w-xs text-sm text-slate-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h2 class="font-display text-center text-3xl font-bold text-slate-900 sm:text-4xl">
        Loved by Students Worldwide
      </h2>
      <p class="mx-auto mt-3 max-w-md text-center text-slate-500">
        See what our users have to say about FinanceTracker
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <figure
          v-for="t in testimonials"
          :key="t.name"
          class="flex flex-col rounded-2xl border border-slate-200 p-6 shadow-sm"
        >
          <div class="flex gap-0.5 text-amber-400">
            <svg v-for="n in 5" :key="n" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path
                d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.9l-5.21 2.74 1-5.79-4.21-4.1 5.82-.85L10 1.5Z"
              />
            </svg>
          </div>
          <blockquote class="mt-4 flex-1 text-slate-600">"{{ t.quote }}"</blockquote>
          <figcaption class="mt-5 flex items-center gap-3">
            <span
              class="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br"
              :class="[t.from, t.to]"
            />
            <span>
              <p class="text-sm font-semibold text-slate-900">{{ t.name }}</p>
              <p class="text-xs text-slate-400">{{ t.role }}</p>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>

    <section id="pricing" class="bg-slate-50 px-4 py-16 sm:px-6">
      <div class="mx-auto max-w-5xl">
        <h2 class="font-display text-center text-3xl font-bold text-slate-900 sm:text-4xl">
          Simple, Transparent Pricing
        </h2>
        <p class="mx-auto mt-3 max-w-md text-center text-slate-500">
          Start free forever. Upgrade when you need more features.
        </p>

        <div class="mt-10 grid gap-6 sm:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.name"
            class="relative rounded-2xl p-6"
            :class="
              plan.highlight
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg sm:-translate-y-3'
                : 'border border-slate-200 bg-white'
            "
          >
            <span
              v-if="plan.badge"
              class="absolute -top-3 left-6 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold tracking-wide text-slate-900 uppercase"
            >
              {{ plan.badge }}
            </span>

            <h3 class="font-display text-xl font-bold" :class="plan.highlight ? 'text-white' : 'text-slate-900'">
              {{ plan.name }}
            </h3>
            <p class="mt-1 text-sm" :class="plan.highlight ? 'text-white/80' : 'text-slate-500'">
              {{ plan.tagline }}
            </p>

            <p class="mt-4">
              <span class="text-3xl font-bold" :class="plan.highlight ? 'text-white' : 'text-slate-900'">
                {{ plan.price }}
              </span>
              <span class="text-sm" :class="plan.highlight ? 'text-white/70' : 'text-slate-400'">
                /{{ plan.period }}
              </span>
            </p>

            <ul class="mt-6 space-y-3 text-sm" :class="plan.highlight ? 'text-white/90' : 'text-slate-600'">
              <li v-for="f in plan.features" :key="f" class="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  class="mt-0.5 h-4 w-4 shrink-0"
                  :class="plan.highlight ? 'text-emerald-300' : 'text-emerald-500'"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8.5 12.5l2.3 2.3L16 10" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                {{ f }}
              </li>
            </ul>

            <RouterLink
              to="/register"
              class="mt-6 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition"
              :class="
                plan.highlight
                  ? 'bg-white text-blue-600 hover:bg-slate-100'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              "
            >
              {{ plan.cta }}
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-16 text-center sm:px-6">
      <h2 class="font-display text-3xl font-bold text-white sm:text-4xl">
        Ready to Take Control of Your Finances?
      </h2>
      <p class="mx-auto mt-3 max-w-md text-white/90">
        Join thousands of students and young professionals managing their money smarter.
      </p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/register"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm transition hover:bg-slate-100"
        >
          Start Free Today
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </RouterLink>
        <RouterLink
          to="/login"
          class="inline-flex items-center justify-center rounded-lg border border-white px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
        >
          Log In
        </RouterLink>
      </div>
    </section>

    <footer class="bg-slate-900 text-slate-300">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div class="flex items-center gap-2">
              <span
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
              <span class="font-display text-lg font-bold text-white">FinanceTracker</span>
            </div>
            <p class="mt-4 max-w-xs text-sm text-slate-400">
              Smart financial management for students and young professionals.
            </p>

            <div class="mt-5 flex items-center gap-3 text-slate-400">
              <a href="#" class="transition hover:text-white" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path
                    d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 0 1-1.9.1c.5 1.6 2.1 2.8 3.9 2.9A8.2 8.2 0 0 1 2 18.4a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z"
                  />
                </svg>
              </a>
              <a href="#" class="transition hover:text-white" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.4 9.4 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
                  />
                </svg>
              </a>
              <a href="#" class="transition hover:text-white" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                  <path
                    d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div v-for="col in footerColumns" :key="col.title">
            <h3 class="font-display font-bold text-white">{{ col.title }}</h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li v-for="link in col.links" :key="link">
                <a href="#" class="text-slate-400 transition hover:text-white">{{ link }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row"
        >
          <p>© 2026 FinanceTracker. All rights reserved.</p>
          <p>Made with ❤️ for students worldwide</p>
        </div>
      </div>
    </footer>
  </div>
</template>
