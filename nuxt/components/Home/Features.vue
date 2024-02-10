<template>
  <div class="relative">
    <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
      <div class="mx-auto max-w-3xl lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
        <div>
          <div>
						<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
							<KeyIcon class="h-8 w-8 text-neutral" aria-hidden="true"/>
						</span>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl font-bold tracking-tight text-neutral">One account. Cutting-edge
              applications.</h2>
            <p class="mt-4 text-lg text-accent">Ever since Exploding Chickens was released back in 2021, the
              sheer number of web services have scaled dramatically under the
              RAkerman Foundation. Author (being one of such services) serves as the second
              point of entry behind Auth0 for almost every RF app.</p>
            <div class="mt-6">
              <NuxtLink to="https://rakerman.com/projects"
                        class="inline-flex rounded-lg bg-secondary px-4 py-1.5 text-base font-semibold leading-7 text-neutral shadow-sm ring-1 ring-secondary hover:bg-secondary-focus hover:ring-secondary-focus">
                Projects @ rakerman.com
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12 sm:mt-16 lg:mt-0">
        <div class="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img class="w-full lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
               src="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/1b4b5b9c-9ef6-47c0-76a2-1f527062b100/xl"
               alt="Exploding Chickens"/>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-24">
    <div class="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
      <div class="mx-auto max-w-3xl lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
        <div>
          <div>
						<span class="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
							<QueueListIcon class="h-8 w-8 text-white" aria-hidden="true"/>
						</span>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl font-bold tracking-tight text-neutral">How Author works.</h2>
            <dl class="mt-8 space-y-4">
              <div v-for="item in operationSteps" :key="item.id" class="relative">
                <dt>
                  <div class="absolute flex h-12 w-12 items-center justify-center rounded-xl text-neutral" :class="item.icon_bg">
                    <component :is="item.icon" class="h-8 w-8" aria-hidden="true"/>
                  </div>
                  <p class="ml-16 text-lg font-medium leading-6 text-neutral" v-html="item.name"></p>
                </dt>
                <dd class="mt-0.5 ml-16 text-base text-accent">{{ item.description }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div class="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
        <div class="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img class="w-full lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
               src="https://imagedelivery.net/5zM6Rdl2uV8Hmr9WxRh20g/0018ca04-fc15-4deb-2a09-f904489cf600/xl"
               alt="Author UI"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  SparklesIcon,
  KeyIcon,
  CheckBadgeIcon,
  ArrowLeftOnRectangleIcon,
  QueueListIcon
} from '@heroicons/vue/24/outline'

const operationSteps = [
  // {
  //   id: 1,
  //   name: 'Page Requires Authentication',
  //   description:
  //       'User hits an app endpoint that enforces authentication. If user is logged in, skip to "Page Authenticated".',
  //   icon: ArrowLeftOnRectangleIcon,
  //   icon_bg: 'bg-primary-focus'
  // },
  {
    id: 2,
    name: 'Redirect to <strong>Auth0</strong>',
    description:
        'User is redirected to Auth0\'s Universal Login, where they can login via SSO or create a new account.',
    icon: KeyIcon,
    icon_bg: 'bg-primary-focus'
  },
  {
    id: 3,
    name: 'Page Authenticated',
    description:
        'Upon successful authorization, user is redirected back to app where the "logged in" state is maintained.',
    icon: CheckBadgeIcon,
    icon_bg: 'bg-success'
  },
  {
    id: 4,
    name: 'Request to <strong>Author</strong>',
    description:
        'App now makes a request to Author. If the user is new, onboarding will occur, otherwise, user details will be returned.',
    icon: SparklesIcon,
    icon_bg: 'bg-secondary'
  },
]
</script>