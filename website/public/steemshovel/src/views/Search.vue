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
                        <router-link to="/search" class="c-breadcrumb__link">Search Result</router-link>
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
        <section class="c-panel">
            <header class="c-toolbar u-m-10">
                <div class="c-toolbar__group">
                    <div class="l-level">
                        <div class="l-level__left">
                            <div class="c-cell">
                                <div class="c-cell__media">
                                    <i class="icon-search"></i>
                                </div>
                                <div class="c-cell__content">
                                    <h1 class="c-toolbar__title"><b class="u-color-info u-fs-28">{{searchFilter}}</b>'s search result</h1>
                                </div>
                            </div>
                            <!-- END .l-media -->
                        </div>
                        <!-- END .l-level__left -->
                    </div>
                    <!-- END .l-level -->
                </div>
                <!-- END .c-toolbar__group -->
            </header>
            <!-- END .c-toolbar -->
            <table class="table table--data table--hover">
                <thead>
                    <tr>
                        <th class="u-hiddenDown@md">ID</th>
                        <th>
                            <a role="button">
                                Name<i class="i-sort is-down"></i>
                            </a>
                        </th>
                        <th>Gender</th>
                        <th>Age<i class="i-sort"></i></th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th class="u-textCenter">Status</th>
                        <th class="u-textRight">
                            <a role="button">
                                Registered<i class="i-sort"></i>
                            </a>
                        </th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th class="u-hiddenDown@md">ID</th>
                        <th>
                            <a role="button">
                                Name<i class="i-sort is-down"></i>
                            </a>
                        </th>
                        <th>Gender</th>
                        <th>Age<i class="i-sort"></i></th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th class="u-textCenter">Status</th>
                        <th class="u-textRight">
                            <a role="button">
                                Registered<i class="i-sort"></i>
                            </a>
                        </th>
                    </tr>
                </tfoot>
                <tbody>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">0</td>
                        <td data-label="Name">
                            <a href="edit.html">Spence Barlow</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (922) 428-3874</td>
                        <td data-label="Email">spencebarlow@miraclis.net</td>
                        <td data-label="Company">MIRACLIS</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-02-15 06:23</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">1</td>
                        <td data-label="Name">
                            <a href="edit.html">Cruz Oneal</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">25</td>
                        <td data-label="Phone">+1 (844) 579-2977</td>
                        <td data-label="Email">cruzoneal@comtext.biz</td>
                        <td data-label="Company">COMTEXT</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-28 13:16</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">2</td>
                        <td data-label="Name">
                            <a href="edit.html">Mosley Palmer</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">34</td>
                        <td data-label="Phone">+1 (984) 484-2605</td>
                        <td data-label="Email">mosleypalmer@ewaves.co.uk</td>
                        <td data-label="Company">EWAVES</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-02-28 04:13</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">3</td>
                        <td data-label="Name">
                            <a href="edit.html">Lula Holder</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">25</td>
                        <td data-label="Phone">+1 (828) 516-2880</td>
                        <td data-label="Email">lulaholder@jamnation.io</td>
                        <td data-label="Company">JAMNATION</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-10 20:34</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">4</td>
                        <td data-label="Name">
                            <a href="edit.html">Barnett Riley</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">34</td>
                        <td data-label="Phone">+1 (891) 528-3792</td>
                        <td data-label="Email">barnettriley@zolarity.ca</td>
                        <td data-label="Company">ZOLARITY</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-04 01:06</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">5</td>
                        <td data-label="Name">
                            <a href="edit.html">Livingston Barron</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">39</td>
                        <td data-label="Phone">+1 (917) 441-3661</td>
                        <td data-label="Email">livingstonbarron@oatfarm.org</td>
                        <td data-label="Company">OATFARM</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-04-14 12:01</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">6</td>
                        <td data-label="Name">
                            <a href="edit.html">Carver Christian</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">39</td>
                        <td data-label="Phone">+1 (837) 535-2826</td>
                        <td data-label="Email">carverchristian@ohmnet.com</td>
                        <td data-label="Company">OHMNET</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-15 22:45</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">7</td>
                        <td data-label="Name">
                            <a href="edit.html">Gilbert Prince</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">36</td>
                        <td data-label="Phone">+1 (932) 545-3020</td>
                        <td data-label="Email">gilbertprince@zork.tv</td>
                        <td data-label="Company">ZORK</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-28 01:14</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">8</td>
                        <td data-label="Name">
                            <a href="edit.html">Bentley Christensen</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">33</td>
                        <td data-label="Phone">+1 (891) 522-3706</td>
                        <td data-label="Email">bentleychristensen@proxsoft.info</td>
                        <td data-label="Company">PROXSOFT</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-16 01:24</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">9</td>
                        <td data-label="Name">
                            <a href="edit.html">Patrick Skinner</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">33</td>
                        <td data-label="Phone">+1 (995) 449-3713</td>
                        <td data-label="Email">patrickskinner@organica.us</td>
                        <td data-label="Company">ORGANICA</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-02 10:31</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">10</td>
                        <td data-label="Name">
                            <a href="edit.html">Marina Clayton</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (922) 599-3731</td>
                        <td data-label="Email">marinaclayton@medcom.me</td>
                        <td data-label="Company">MEDCOM</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-03 16:43</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">11</td>
                        <td data-label="Name">
                            <a href="edit.html">Kristy Roberts</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">28</td>
                        <td data-label="Phone">+1 (863) 413-2588</td>
                        <td data-label="Email">kristyroberts@kegular.name</td>
                        <td data-label="Company">KEGULAR</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-11 08:15</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">12</td>
                        <td data-label="Name">
                            <a href="edit.html">Carol Lancaster</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (838) 504-3277</td>
                        <td data-label="Email">carollancaster@eventix.net</td>
                        <td data-label="Company">EVENTIX</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-27 07:34</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">13</td>
                        <td data-label="Name">
                            <a href="edit.html">Whitfield Kemp</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (942) 474-3634</td>
                        <td data-label="Email">whitfieldkemp@nikuda.biz</td>
                        <td data-label="Company">NIKUDA</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-02-08 14:47</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">14</td>
                        <td data-label="Name">
                            <a href="edit.html">Kara Graves</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">32</td>
                        <td data-label="Phone">+1 (928) 410-3280</td>
                        <td data-label="Email">karagraves@orboid.co.uk</td>
                        <td data-label="Company">ORBOID</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-04-12 19:04</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">15</td>
                        <td data-label="Name">
                            <a href="edit.html">Decker Long</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">40</td>
                        <td data-label="Phone">+1 (894) 540-2028</td>
                        <td data-label="Email">deckerlong@flumbo.io</td>
                        <td data-label="Company">FLUMBO</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-03-04 10:07</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">16</td>
                        <td data-label="Name">
                            <a href="edit.html">Peggy Camacho</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (971) 492-3631</td>
                        <td data-label="Email">peggycamacho@honotron.ca</td>
                        <td data-label="Company">HONOTRON</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--default">Unactived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-02-02 20:23</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">17</td>
                        <td data-label="Name">
                            <a href="edit.html">Pacheco Foster</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">40</td>
                        <td data-label="Phone">+1 (945) 480-3291</td>
                        <td data-label="Email">pachecofoster@xsports.org</td>
                        <td data-label="Company">XSPORTS</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-01-22 23:40</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">18</td>
                        <td data-label="Name">
                            <a href="edit.html">Lloyd Murphy</a>
                        </td>
                        <td data-label="Gender">male</td>
                        <td data-label="Age">29</td>
                        <td data-label="Phone">+1 (979) 471-3832</td>
                        <td data-label="Email">lloydmurphy@zytrex.com</td>
                        <td data-label="Company">ZYTREX</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-04-02 02:18</time>
                        </td>
                    </tr>
                    
                    <tr>
                        <td data-label="ID" class="u-hiddenDown@md">19</td>
                        <td data-label="Name">
                            <a href="edit.html">Whitaker Drake</a>
                        </td>
                        <td data-label="Gender">female</td>
                        <td data-label="Age">35</td>
                        <td data-label="Phone">+1 (853) 562-3924</td>
                        <td data-label="Email">whitakerdrake@splinx.tv</td>
                        <td data-label="Company">SPLINX</td>
                        <td data-label="Status" class="u-textCenter">
                            
                            <span class="badge badge--success">Actived</span>
                            
                        </td>
                        <td data-label="Date" class="u-textRight">
                            <time class="u-fs-12 u-textMuted">2017-02-09 23:19</time>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <div class="c-toolbar u-mb-0">
                <div class="l-level">
                    <div class="l-level__left">
                    </div>
                    <div class="l-level__right">
                        <div class="l-level__item">
                            <nav class="c-pagination c-pagination--bordered">
                                <span class="c-pagination__item is-disabled">Previous</span>
                                <em class="c-pagination__item is-active">1</em>
                                <a href="#" class="c-pagination__item">2</a>
                                <a href="#" class="c-pagination__item">3</a>
                                <a href="#" class="c-pagination__item">4</a>
                                <a href="#" class="c-pagination__item">5</a>
                                <span class="c-pagination__item is-disabled">...</span>
                                <a href="#" class="c-pagination__item">99</a>
                                <a href="#" class="c-pagination__item">100</a>
                                <a href="#" class="c-pagination__item">Next</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
  import SearchHeader from '../components/SearchHeader.vue'

  export default {
    name: 'SearchView',
    data: function () {
      return {
        searchFilter: localStorage.getItem('search')
      }
    },
    components: {
      searchHeader: SearchHeader
    }
  }
</script>
