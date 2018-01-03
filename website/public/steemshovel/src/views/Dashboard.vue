<template>
  <div>
    <div class="c-toolbar u-mb-0">
      <div class="l-container">
        <div class="l-level">
          <div class="l-level__left">
            <ol class="c-breadcrumb">
              <li class="c-breadcrumb__item">
                  <a href="#" class="c-breadcrumb__link">Home</a>
              </li>
              <li class="c-breadcrumb__item">
                <router-link to="/" class="c-breadcrumb__link">Dashboard</router-link>
              </li>
            </ol>
          </div>
            <div class="l-level__right">
                <div class="l-level__item">
                    <search-header></search-header>
                </div>
            </div>
        </div>
      </div>
    </div>
    <main class="l-app__main" role="main">
      <div class="l-container">
        <div class="l-row l-panelGroup">
            <div class="l-col-6@lg">
                <section class="c-panel">
                    <div class="c-panel__body u-flexCenter">
                        <div class="c-count c-count--xl u-textCenter">
                            <div class="c-count__label">Sales</div>
                            <div class="c-count__content">87,392</div>
                        </div>
                    </div>
                </section>
                <!-- END .c-panel -->
            </div>
            <!-- END .l-col-6@lg -->
            <div class="l-col-6@lg">
                <section class="c-panel">
                    <div class="c-panel__body">
                        <div class="l-level">
                            <div class="l-level__item">
                                <div class="c-count u-textCenter">
                                    <div class="c-count__label">TWEETS</div>
                                    <div class="c-count__content">2,314</div>
                                </div>
                            </div>
                            <!-- END .l-level__item -->
                            <div class="l-level__item">
                                <div class="c-count u-textCenter">
                                    <div class="c-count__label">FOLLWING</div>
                                    <div class="c-count__content">64</div>
                                </div>
                            </div>
                            <!-- END .l-level__item -->
                            <div class="l-level__item">
                                <div class="c-count u-textCenter">
                                    <div class="c-count__label">FOLLOWERS</div>
                                    <div class="c-count__content">62,086</div>
                                </div>
                            </div>
                            <!-- END .l-level__item -->
                        </div>
                    </div>
                </section>
                <!-- END .c-panel -->
                <section class="c-panel">
                    <div class="c-panel__body">
                        <div class="l-level">
                            <div class="l-level__item c-count">
                                <circle-chart :percent="60" color="#FCC100">
                                    <span>60%</span>
                                </circle-chart>
                                <div class="c-count__label">Progress</div>
                            </div>
                            <!-- END .l-level__item -->
                            <div class="l-level__item c-count">
                                <div class="c-count__content u-color-success u-flexCenter" style="height: 80px;">48</div>
                                <div class="c-count__label">Pendding</div>
                            </div>
                            <!-- END .l-level__item -->
                        </div>
                    </div>
                    <!-- END .c-panel__body -->
                </section>
                <!-- END .c-panel -->
            </div>
            <!-- END .l-col-6@lg -->
        </div>
        <!-- END .l-row -->
        <div class="l-row l-panelGroup">
            <div class="l-col-6@sm l-col-4@md l-col-2@lg">
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">Total Revenue</h2>
                    </header>
                    <div class="c-panel__body u-textCenter">
                        <div class="l-level__item c-count">
                            <circle-chart :percent="60" color="#1976d2" :size="150" :line-width="3">
                                <span style="color: #1976d2;font-size: 24px">60</span>
                            </circle-chart>
                            <div class="c-count__label">Total sales made today</div>
                        </div>
                    </div>
                    <div class="c-panel__footer">
                        <div class="l-level">
                            <div class="l-level__item">
                                <div class="u-fs-16">$10000</div>
                                <div class="meta">Target</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$224</div>
                                <div class="meta">Last day</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$965</div>
                                <div class="meta">Last week</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-2@lg -->
            <div class="l-col-6@sm l-col-4@md l-col-2@lg">
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">Total Revenue</h2>
                    </header>
                    <div class="c-panel__body u-textCenter">
                        <div class="c-count">
                            <circle-chart :percent="80" color="#4caf50" :size="150" :line-width="3">
                                <span style="color: #4caf50;font-size: 24px">80</span>
                            </circle-chart>
                            <div class="c-count__label">Total sales made today</div>
                        </div>
                    </div>
                    <div class="c-panel__footer">
                        <div class="l-level">
                            <div class="l-level__item">
                                <div class="u-fs-16">$10000</div>
                                <div class="meta">Target</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$224</div>
                                <div class="meta">Last day</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$965</div>
                                <div class="meta">Last week</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-2@lg -->
            <div class="l-col-6@sm l-col-4@md l-col-2@lg">
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">Total Revenue</h2>
                    </header>
                    <div class="c-panel__body u-textCenter">
                        <div class="c-count">
                            <circle-chart :percent="55" color="#ff5722" :size="150" :line-width="3">
                                <span style="color: #ff5722;font-size: 24px">55</span>
                            </circle-chart>
                            <div class="c-count__label">Total sales made today</div>
                        </div>
                    </div>
                    <div class="c-panel__footer">
                        <div class="l-level">
                            <div class="l-level__item">
                                <div class="u-fs-16">$10000</div>
                                <div class="meta">Target</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$224</div>
                                <div class="meta">Last day</div>
                            </div>
                            <div class="l-level__item">
                                <div class="u-fs-16">$965</div>
                                <div class="meta">Last week</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-2@lg -->
            <div class="l-col-6@md l-col-3@lg">
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">Clients</h2>
                    </header>
                    <div class="c-panel__body">
                        <div class="form-group">
                            <label class="form-label u-textMuted">Beijing(56)</label>
                            <progress class="progress progress--info" value="45" max="100"></progress>
                        </div>
                        <!-- END .form-group -->
                        <div class="form-group">
                            <label class="form-label u-textMuted">Shanghai(60)</label>
                            <progress class="progress progress--danger" value="60" max="100"></progress>
                        </div>
                        <!-- END .form-group -->
                        <div class="form-group">
                            <label class="form-label u-textMuted">Chengdu(80)</label>
                            <progress class="progress progress--warning" value="80" max="100"></progress>
                        </div>
                        <!-- END .form-group -->
                        <div class="form-group">
                            <label class="form-label u-textMuted">Shenzhen(15)</label>
                            <progress class="progress" value="15" max="100"></progress>
                        </div>
                        <!-- END .form-group -->
                        <div class="form-group">
                            <label class="form-label u-textMuted">Guangzhou(30)</label>
                            <progress class="progress progress--primary" value="30" max="100"></progress>
                        </div>
                        <!-- END .form-group -->
                    </div>
                </section>
            </div>
            <!-- END .l-col-3@lg -->
            <div class="l-col-6@md l-col-3@lg">
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">New Visitors</h2>
                    </header>
                    <div class="c-panel__body">
                        <div class="c-count">
                            <div class="c-count__content">23,892</div>
                            <progress class="progress progress--info progress--sm u-mt-10 u-mb-5" value="75" max="100"></progress>
                            <div class="c-count__label">
                                <i class="icon-arrow-up5 u-color-success"></i> 65% more than last month
                            </div>
                        </div>
                    </div>
                </section>
                <!-- END .c-panel -->
                <section class="c-panel">
                    <header class="c-panel__header">
                        <h2 class="c-panel__title">New Orders</h2>
                    </header>
                    <div class="c-panel__body">
                        <div class="c-count">
                            <div class="c-count__content">6,991</div>
                            <progress class="progress progress--warning progress--sm u-mt-10 u-mb-5" value="50" max="100"></progress>
                            <div class="c-count__label">
                                <i class="icon-arrow-up5 u-color-success"></i> 35% more than last month
                            </div>
                        </div>
                    </div>
                </section>
                <!-- END .c-panel -->
            </div>
            <!-- END .l-col-3@lg -->
        </div>
        <!-- END .l-row -->
        <div class="l-row">
            <div class="l-col-4@md">
                <section class="c-panel">
                    <div class="c-panel__body u-p-30 u-textCenter">
                        <div class="c-message">
                            <div class="c-message__media">
                                <i class="icon-users icon-3x u-color-teal"></i>
                            </div>
                            <div class="c-message__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, repudiandae.
                            </div>
                            <button class="btn btn--success btn--lg btn--smart btn--rounded">Call Us</button>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-4@md -->
            <div class="l-col-4@md">
                <section class="c-panel">
                    <div class="c-panel__body u-p-30 u-textCenter">
                        <div class="c-message">
                            <div class="c-message__media">
                                <i class="icon-paperplane icon-3x u-color-lime"></i>
                            </div>
                            <div class="c-message__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, repudiandae.
                            </div>
                            <button class="btn btn--success btn--lg btn--smart btn--rounded">Send Email</button>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-4@md -->
            <div class="l-col-4@md">
                <section class="c-panel">
                    <div class="c-panel__body u-p-30 u-textCenter">
                        <div class="c-message">
                            <div class="c-message__media">
                                <i class="icon-bubbles icon-3x u-color-blue"></i>
                            </div>
                            <div class="c-message__content">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, repudiandae.
                            </div>
                            <button class="btn btn--success btn--lg btn--smart btn--rounded">Snapchat</button>
                        </div>
                    </div>
                </section>
            </div>
            <!-- END .l-col-4@md -->
        </div>
        <!-- END .l-row -->
      </div>
    </main>
  </div>
</template>

<script>
  import SearchHeader from '../components/SearchHeader.vue'

  export default {
    name: 'DashBoardView',
    components: {
      searchHeader: SearchHeader
    }
  }
</script>
